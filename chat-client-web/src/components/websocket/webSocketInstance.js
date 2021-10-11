import {message} from 'antd'
import {byteToString, stringToByte} from "../../common/util/stringUtil";
import {addAckQueue, handleMessage} from "./messagehandler";
import {messageType} from "./messageType";

class WebSocketInstance {

	socket;

	/**
	 * 配置信息
	 */
	config = {
		heartbeat: {
			enabled: true, // 是否发送心跳包
			heartBeatTime: 60000, // 心跳包 发送间隔时长
			readTimeout: 180000, // 空闲检测
			setInterval: null, // 心跳包计时器
			idleSetTimeout: null, // 空闲 计时器
		},
		reconnect: {
			lockReconnect: false,
			setTimeout: null, // 计时器对象
			initTime: 500, // 初始重连间隔时间
			curNumber: 0, // 重连次数
			maxNumber: 10 // 最大重连次数
		}
	}

	createWebSocket = () => {
		if ('WebSocket' in window) {
			this.socket = new WebSocket('ws://localhost:18081/tchat');
			this.socket.binaryType = "arraybuffer"
		} else {
			message.error('当前浏览器不支持 WebSocket');
			return
		}
		this.socket.onopen = () => {
			console.log('[websocket] connect established', this.socket);
			message.destroy('websocket reconnect');
			// 心跳检测
			if (this.config.heartbeat.enabled) {
				this.idleDetect();
				this.heartbeat()
			}
		};
		this.socket.onmessage = (event) => this.recvMsg(event);
		this.socket.onerror = () => {
			console.log("[websocket] connect error")
		};
		this.socket.onclose = (e) => {
			console.log('[websocket] connect closed',  e, e.code, e.reason, e.wasClean);
			if (e.code === 1006 || e.code === 1005) {
				this.reconnect()
			}
		};
	};

	heartbeat = () => {
		console.log('start heartbeat', new Date().getTime());
		let f = () => {
			this.sendMsg(messageType.HeartBeatRequestMessage, {});
			return f
		};
		this.config.heartbeat.setInterval = setInterval(
			f(), this.config.heartbeat.heartBeatTime
		)
	};

	idleDetect = () => {
		console.log('idle detect', new Date().getTime());
		this.config.heartbeat.idleSetTimeout = setTimeout(() => {
			// 超时关闭
			this.closeWebSocket()
		}, this.config.heartbeat.readTimeout)
	};

	reconnect = () => {
		console.log('try reconnect');
		let reconnect = this.config.reconnect;
		if (reconnect.lockReconnect || reconnect.curNumber === reconnect.maxNumber) {
			return
		}
		reconnect.lockReconnect = true;
		if (reconnect.setTimeout) {
			clearTimeout(reconnect.setTimeout)
		}

		reconnect.setTimeout = setTimeout(() => {
			console.log(`try reconnect（number: ${reconnect.curNumber}, next timeout: ${reconnect.initTime} ms）`);
			this.createWebSocket();
			reconnect.lockReconnect = false;
			reconnect.curNumber++;
			reconnect.initTime *= 2;
			message.warn({
				content: `websocket closed，trying reconnect（number: ${reconnect.curNumber}, next timeout: ${reconnect.initTime} ms）`,
				key: 'websocket reconnect',
				duration: 0
			})
		}, reconnect.initTime)
	};

	reset = () => {
		clearTimeout(this.config.heartbeat.idleSetTimeout);
		this.idleDetect()
	};

	closeWebSocket = () => {
		console.log('close web socket');
		if (this.config.heartbeat.enabled) {
			clearInterval(this.config.heartbeat.setInterval)
		}
		this.socket && this.socket.close();
	};

	sendMsg = (type, data) => {
		console.log('[websocket] send msg: ', type, data, new Date().getTime());
		if (!this.socket || this.socket.readyState !== 1) {
			console.log('[websocket] websocket connect closed', this.socket);
			return
		}

		let str = JSON.stringify(data);
		let bodyBytes = stringToByte(str);

		let buffer = new ArrayBuffer(20 + bodyBytes.length);
		let dataView = new DataView(buffer);
		// 魔数
		dataView.setInt32(0, parseInt('19982021', 16));
		// 版本
		dataView.setInt8(4, 1);
		// 序列化算法（0：protobuf；1：json）
		dataView.setInt8(5, 1);
		// 命令（消息类型）
		dataView.setInt8(6, type.code);
		// 第 7 位保留

		// seqId
		let seqId = this.nextSeqId();
		dataView.setBigInt64(8, BigInt(seqId));
		// body 长度
		dataView.setInt32(16, bodyBytes.length);
		// body
		for (let i = 0; i < bodyBytes.length; i++) {
			dataView.setInt8(20 + i, bodyBytes[i])
		}
		this.socket.send(buffer);
		// seqId 入确认队列
		addAckQueue(seqId, data)
	};

	recvMsg = (event) => {
		let buffer = event.data;
		let dataView = new DataView(buffer);
		let magicNumber = dataView.getInt32(0);
		if (magicNumber !== parseInt('19982021', 16)) {
			return
		}
		let version = dataView.getInt8(4);
		let serialAlgo = dataView.getInt8(5);
		let command = dataView.getInt8(6);
		let seqId = dataView.getBigInt64(8);

		let bodyLen = dataView.getInt32(16);
		var bytes = [];
		for (let i = 0; i < bodyLen; i++) {
			bytes[i] = dataView.getInt8(20 + i)
		}
		let str = byteToString(bytes);
		let data = JSON.parse(str);
		console.log('[websocket] recv msg: ', data);
		handleMessage(command, seqId, data);
		this.reset()
	};

	nextSeqId = () => {
		return new Date().getTime();
	};
}

export default new WebSocketInstance()