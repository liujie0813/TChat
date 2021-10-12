import {message} from 'antd'
import {byteToString, stringToByte} from "../../common/util/stringUtil";
import {commandMap, messageType} from "./messageType";
import AckQueue from './ackQueue'
import {getAccessToken} from "../../common/js/accessToken";

class TchatWebSocket {

	socket;

	url;

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

	onCallBacks = {}

	constructor(url) {
		this.url = url
	}

	createWebSocket = () => {
		console.log('[ WS ] create web socket')
		if (this.socket != null) {
			this.socket.close();
			this.socket = null;
		}

		if ('WebSocket' in window) {
			this.socket = new WebSocket(this.url);
			this.socket.binaryType = "arraybuffer"
		} else {
			message.error('当前浏览器不支持 TchatWebSocket');
			return
		}
		this.socket.onerror = this.onError.bind(this);
		this.socket.onopen = this.onOpen.bind(this);
		this.socket.onmessage = this.onMessage.bind(this);
		this.socket.onclose = this.onClose.bind(this);
	};

	onOpen = (event) => {
		console.log("[ WS ] connect open")
		message.destroy('websocket reconnect');
		// 心跳检测
		if (this.config.heartbeat.enabled) {
			this.idleDetect();
			this.heartbeat()
		}
	}

	onError = (event) => {
		console.log("[ WS ] connect error")
	}

	onClose = (event) => {
		if (this.config.heartbeat.enabled) {
			clearInterval(this.config.heartbeat.setInterval)
		}
		console.log('[ WS ] close event: ', event)
		if (event.code === 1006) {
			this.reconnect()
		}
		console.log("[ WS ] connect close")
	}

	closeWebSocket = () => {
		this.socket && this.socket.close();
	};

	heartbeat = () => {
		console.log('[ WS ] [ heartbeat ] start heartbeat', new Date().getTime());
		let f = () => {
			this.send(messageType.HeartBeatRequestMessage, {});
			return f
		};
		this.config.heartbeat.setInterval = setInterval(
			f(), this.config.heartbeat.heartBeatTime
		)
	};

	idleDetect = () => {
		console.log('[ WS ] [ idleState ] idle detect', new Date().getTime());
		this.config.heartbeat.idleSetTimeout = setTimeout(() => {
			// 超时关闭
			this.closeWebSocket()
		}, this.config.heartbeat.readTimeout)
	};

	reconnect = () => {
		console.log('[ try reconnect ]');
		let reconnect = this.config.reconnect;
		if (reconnect.lockReconnect || reconnect.curNumber === reconnect.maxNumber) {
			return
		}
		reconnect.lockReconnect = true;
		if (reconnect.setTimeout) {
			clearTimeout(reconnect.setTimeout)
		}

		reconnect.setTimeout = setTimeout(() => {
			console.log(`[ WS ] [ try reconnect ] number: ${reconnect.curNumber}, next timeout: ${reconnect.initTime} ms`);
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

	onEncode = (seqId, command, data) => {
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
		dataView.setInt8(6, command.code);
		// 第 7 位保留

		// seqId
		dataView.setBigInt64(8, BigInt(seqId));
		// body 长度
		dataView.setInt32(16, bodyBytes.length);
		// body
		for (let i = 0; i < bodyBytes.length; i++) {
			dataView.setInt8(20 + i, bodyBytes[i])
		}
		return buffer
	}

	send = (command, data) => {
		console.log('[ WS ] [ sendMsg ]', command, data, new Date().getTime());
		if (!this.socket || this.socket.readyState !== 1) {
			console.log('[ WS ] websocket connect closed', this.socket);
			return
		}

		let seqId = new Date().getTime();
		let buffer = this.onEncode(seqId, command, data)
		this.socket.send(buffer);
		// seqId 入确认队列
		AckQueue.addSeqId(seqId, data)
	};

	onDecode = (originData) => {
		let dataView = new DataView(originData);
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

		return {
			command,
			data
		}
	}

	onMessage = (event) => {
		let {command, data} = this.onDecode(event.data)

		if (this.onCallBacks[command]) {
			this.onCallBacks[command](data)
			this.reset()
		} else {
			console.warn(`[ WS ] not find command [${commandMap[command]}]`)
		}
	};

	/**
	 * 事件绑定
	 *
	 * @param commandEnum 消息类型
	 * @param callBack 回调方法（消息处理器）
	 */
	onCommand = (commandEnum, callBack) => {
		this.onCallBacks[commandEnum.code] = callBack
		return this
	}

}

export default TchatWebSocket