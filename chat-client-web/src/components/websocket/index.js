import {message} from 'antd'
import {stringToByte} from "../../common/js/StringByte";

let socket;

const createWebSocket = () => {
	if ('WebSocket' in window) {
		socket = new WebSocket('ws://localhost:18081/tchat')
		socket.binaryType = "arraybuffer"
	} else {
		message.error('当前浏览器不支持 WebSocket ！')
		return
	}
	socket.onopen = () => {
		console.log('Connection established ！')
		// 心跳检测
	}
	socket.onmessage = (event) => this.recvMsg(event)
	socket.onerror = () => {
		console.log("Error ！")
	}
	socket.onclose = () => {
		console.log('Connection closed ！')
	}
}

const sendMsg = (type, data) => {
	let str = JSON.stringify(data);
	let bodyBytes = stringToByte(str);

	let buffer = new ArrayBuffer(12 + bodyBytes.length);
	let dataView = new DataView(buffer);
	// 魔数
	dataView.setInt32(0, parseInt('19982021', 16));
	// 版本
	dataView.setInt8(4, 1)
	// 序列化算法（0：protobuf；1：json）
	dataView.setInt8(5, 1)
	// 命令（消息类型）
	dataView.setInt8(6, type)
	// 第 7 位保留
	// body 长度
	dataView.setInt32(8, bodyBytes.length)
	// body
	for (let i = 0; i < bodyBytes.length; i++) {
		dataView.setInt8(12 + i, bodyBytes[i])
	}
	socket.send(buffer)
}

const recvMsg = (event) => {
	console.log(event)
}

const closeWebSocket = () => {
	socket && socket.close();
}

export {
	createWebSocket, sendMsg, recvMsg, closeWebSocket
}