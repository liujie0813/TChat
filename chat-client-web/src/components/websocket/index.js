import {message} from 'antd'
import {byteToString, stringToByte} from "../../common/js/StringByte";
import {addAckQueue, handleMessage} from "./messagehandler";

let socket;
let seqIdInitVal;

const createWebSocket = () => {
	if ('WebSocket' in window) {
		socket = new WebSocket('ws://localhost:18081/tchat');
		socket.binaryType = "arraybuffer"
	} else {
		message.error('当前浏览器不支持 WebSocket ！');
		return
	}
	socket.onopen = () => {
		console.log('Connection established ！')
		// 心跳检测
	};
	socket.onmessage = (event) => recvMsg(event);
	socket.onerror = () => {
		console.log("Error ！")
	};
	socket.onclose = () => {
		console.log('Connection closed ！')
	};
	seqIdInitVal = 19980813;
};

const sendMsg = (type, data) => {
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
	let seqId = nextSeqId();
	dataView.setInt32(8, seqId);
	// body 长度
	dataView.setInt32(12, bodyBytes.length);
	// body
	for (let i = 0; i < bodyBytes.length; i++) {
		dataView.setInt8(16 + i, bodyBytes[i])
	}
	socket.send(buffer);
	// msgId 入确认队列
	addAckQueue(seqId, data)
};

const recvMsg = (event) => {
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
	let data = JSON.parse(str);
	handleMessage(command, seqId, data);
};

const closeWebSocket = () => {
	socket && socket.close();
};

const nextSeqId = () => {
	return seqIdInitVal++
};

export {
	createWebSocket, sendMsg, recvMsg, closeWebSocket, nextSeqId
}