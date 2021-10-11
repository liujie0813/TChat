import {commandMap, messageType} from './messageType'
import store from '../../store/index'
import {setUnreadNum, updateChatRecord} from '../../store/features/userSlice'
import {Modal, message} from "antd";
import {getRefreshToken, setLoginToken} from "../../common/js/accessToken";
import servicef from "../../common/js/request";
import WebSocketInstance from "./webSocketInstance";

const ackMap = new Map();

const handleMessage = (command, seqId, data) => {
	let type = commandMap.get(command);
	switch (type) {
		case messageType.AuthResponseMessage:
			handleAuthResp(data);
			break;
		case messageType.C2CSendResponseMessage:
			handleC2CSendResp(data);
			break;
		case messageType.C2GSendResponseMessage:
			handleC2GSendResp(data);
			break;
		case messageType.C2CPushRequestMessage:
			handleC2CPushReq(data);
			break;
		case messageType.C2GPushRequestMessage:
			handleC2GPushReq(data);
			break;
		case messageType.HeartBeatResponseMessage:
			console.log("[handleMessage] recv heart beat resp")
			break;
		case messageType.GenericMessage:
			message.error(data.msg)
			break;
	}
};

const handleAuthResp = (resp) => {
	const code = resp.code;
	if (code === 0) {
		console.log("auth success")
		return
	}

	if (code === 102001    // 访问令牌不存在
		|| code === 102003 // 刷新令牌不存在
		|| code === 102004) { // 刷新令牌已过期
		Modal.confirm({
			title: '系统提示',
			content: resp.msg,
			okText: '重新登录',
			onOk: function (e) {
				history.push('/login')
			}
		})
	} else if (code === 102002) { // 访问令牌已过期
		return refreshTokenAndAuth();
	} else {
		Modal.warn({
			title: '系统提示',
			content: resp.msg,
		})
		console.log(resp)
	}
}

function refreshTokenAndAuth() {
	let refreshToken = getRefreshToken();
	return servicef({
		url: '/user/refresh-token',
		method: 'GET',
		params: {
			refreshToken
		}
	}).then(data => {
		setLoginToken(data.accessToken, data.refreshToken)
		WebSocketInstance.sendMsg(messageType.AuthResponseMessage, {
			accessToken: data.accessToken
		})
	})
}

const handleC2CSendResp = (resp) => {
	let data = ackMap.get(resp.seqId);
	ackMap.delete(resp.seqId);

	let userInfo = getStateUser().userInfo;
	// 更新 聊天记录列表
	store.dispatch(updateChatRecord({
		talkId: data.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: data.fromId,
			from: userInfo.nickname,
			content: data.content,
			sendTime: resp.sendTime
		}],
		updateUnreadNum: false
	}))
};

const handleC2GSendResp = (resp) => {
	let data = ackMap.get(resp.seqId);
	ackMap.delete(resp.seqId);

	let userInfo = getStateUser().userInfo;

	// 更新 聊天记录列表
	store.dispatch(updateChatRecord({
		talkId: data.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: data.fromId,
			from: userInfo.nickname,
			content: data.content,
			sendTime: resp.sendTime
		}],
		updateUnreadNum: false
	}))
};

const handleC2CPushReq = (resp) => {
	let userIdMap = getStateUser().userIdMap;

	let updateUnreadNum = !(getStateUser().activeMenu === 'chatMenu' && getStateUser().activeChat.key === resp.talkId);
	store.dispatch(updateChatRecord({
		talkId: resp.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: resp.fromId,
			from: userIdMap[resp.fromId],
			content: resp.content,
			sendTime: resp.sendTime
		}],
		updateUnreadNum
	}))
};

const handleC2GPushReq = (resp) => {
	let stateUser = getStateUser();
	let from;
	if (stateUser.userIdMap[resp.fromId]) {
		from = stateUser.userIdMap[resp.fromId];
	} else {
		let groupId = stateUser.chatRecordMap[resp.talkId].groupId;
		from = stateUser.groupMap[groupId].memberMap[resp.talkId].nickname;
	}

	let updateUnreadNum = !(getStateUser().activeMenu === 'chatMenu' && getStateUser().activeChat && getStateUser().activeChat.key === resp.talkId);
	store.dispatch(updateChatRecord({
		talkId: resp.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: resp.fromId,
			from: from,
			content: resp.content,
			sendTime: resp.sendTime
		}],
		updateUnreadNum
	}))
};

function getStateUser() {
	return store.getState().user;
}

const addAckQueue = (seqId, data) => {
	ackMap.set(seqId, data)
};

export {
	handleMessage, addAckQueue
}