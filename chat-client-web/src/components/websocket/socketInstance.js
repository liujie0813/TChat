import TchatWebSocket from "./tchatWebSocket";
import config from "../../config/config";
import {messageType} from "./messageType";
import C2CSendResponseMessageHandler from "./messageHandler/c2cSendRespHandler";
import HeartBeatResponseMessageHandler from "./messageHandler/heartBeatRespHandler";
import C2GSendResponseMessageHandler from "./messageHandler/c2gSendRespHandler";
import C2CPushRequestMessageHandler from "./messageHandler/c2cPushReqHandler";
import AuthResponseMessageHandler from "./messageHandler/authRespHandler";
import C2GPushRequestMessageHandler from "./messageHandler/c2gPushReqHandler";
import JoinGroupRequestMessageHandler from "./messageHandler/JoinGroupReqHandler";

class SocketInstance {

	webSocket

	constructor() {
		this.webSocket = new TchatWebSocket(config.BASE_WS_URL);
		this.registerEvents()
	}

	connect = () => {
		this.webSocket.createWebSocket()
	}

	registerEvents = () => {
		this.webSocket
			.onCommand(messageType.AuthResponseMessage, resp => {
				new AuthResponseMessageHandler(resp).handle()
			})
			.onCommand(messageType.C2CSendResponseMessage, resp => {
				new C2CSendResponseMessageHandler(resp).handle()
			})
			.onCommand(messageType.C2CPushRequestMessage, resp => {
				new C2CPushRequestMessageHandler(resp).handle()
			})
			.onCommand(messageType.C2GSendResponseMessage, resp => {
				new C2GSendResponseMessageHandler(resp).handle()
			})
			.onCommand(messageType.C2GPushRequestMessage, resp => {
				new C2GPushRequestMessageHandler(resp).handle()
			})
			.onCommand(messageType.JoinGroupRequestMessage, resp => {
				new JoinGroupRequestMessageHandler(resp).handle()
			})
			.onCommand(messageType.HeartBeatResponseMessage, resp => {
				new HeartBeatResponseMessageHandler(resp).handle()
			})
		console.log('[ WS ] [ registerEvents ] event length: ', Object.getOwnPropertyNames(this.webSocket.onCallBacks).length)
	}

	send = (command, data) => {
		this.webSocket.send(command, data)
	}

	close = () => {
		this.webSocket.closeWebSocket();
	}

}

export default new SocketInstance()