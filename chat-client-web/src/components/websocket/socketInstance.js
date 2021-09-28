import {message} from 'antd'
import {byteToString, stringToByte} from "../../common/util/stringUtil";
import {addAckQueue, handleMessage} from "./messagehandler";

class WebSocketInstance {

	socket;

	constructor() {
		if ('WebSocket' in window) {
			this.socket = new WebSocket('ws://localhost:18081/tchat');
			this.socket.binaryType = "arraybuffer"
		} else {
			message.error('当前浏览器不支持 WebSocket ！');
			return
		}
		this.socket.onopen = () => {
			console.log('[websocket] connection established ！')
			// 心跳检测
		};
		this.socket.onmessage = (event) => this.recvMsg(event);
		this.socket.onerror = () => {
			console.log("Error ！")
		};
		this.socket.onclose = () => {
			console.log('Connection closed ！')
		};
	};

	sendMsg = (type, data) => {
		console.log('[websocket] send msg: ', data)
		let str = JSON.stringify(data);
		let bodyBytes = stringToByte(str);

		let buffer = new ArrayBuffer(16 + bodyBytes.length);
		let dataView = new DataView(buffer);
		// 魔数
		dataView.setInt32(0, parseInt('19982021', 16));
		// 版本
		dataView.setInt8(4, 1);
		// 序列化算法（0：protobuf；1：json）
		dataView.setInt8(5, 1);
		// 命令（消息类型）
		dataView.setInt8(6, type);
		// 第 7 位保留

		// seqId
		let seqId = this.nextSeqId();
		dataView.setInt32(8, seqId);
		// body 长度
		dataView.setInt32(12, bodyBytes.length);
		// body
		for (let i = 0; i < bodyBytes.length; i++) {
			dataView.setInt8(16 + i, bodyBytes[i])
		}
		this.socket.send(buffer);
		// msgId 入确认队列
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
		let seqId = dataView.getInt32(8);

		let bodyLen = dataView.getInt32(12);
		var bytes = [];
		for (let i = 0; i < bodyLen; i++) {
			bytes[i] = dataView.getInt8(16 + i)
		}
		let str = byteToString(bytes);
		console.log('[websocket] recv msg: ', str)
		let data = JSON.parse(str);
		handleMessage(command, seqId, data);
	};

	closeWebSocket = () => {
		this.socket && this.socket.close();
	};

	nextSeqId = () => {
		return new Date().getTime();
	};
}

export default new WebSocketInstance()