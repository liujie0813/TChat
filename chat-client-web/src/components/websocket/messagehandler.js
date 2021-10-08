import {commandMap, messageType} from './messageType'
import store from '../../store/index'
import {setUnreadNum, updateChatRecord} from '../../store/features/userSlice'
import {Modal} from "antd";
import {getRefreshToken, setLoginToken} from "../../common/js/accessToken";
import servicef from "../../common/js/request";
import WebSocketInstance from "./webSocketInstance";

const ackMap = new Map();

const handleMessage = (command, seqId, data) => {
	let type = commandMap.get(command);
	switch (type) {
		case messageType.AuthRequestMessage:
			handleAuthResp(data);
			break;
		case messageType.C2CSendResponseMessage:
			handleC2CSendResp(data);
			break;
		case messageType.C2CPushRequestMessage:
			handleC2CPushResp(data);
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
	let userIdMap = getStateUser().userIdMap;

	ackMap.delete(resp.seqId);
	// 更新 聊天记录列表
	store.dispatch(updateChatRecord({
		talkId: data.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: data.fromId,
			from: userIdMap[data.fromId],
			content: data.content,
			sendTime: resp.sendTime
		}]
	}))
};

const handleC2CPushResp = (resp) => {
	let userIdMap = getStateUser().userIdMap;

	store.dispatch(updateChatRecord({
		talkId: resp.talkId,
		records: [{
			msgId: resp.msgId,
			msgType: 0,
			fromId: resp.fromId,
			from: userIdMap[resp.fromId],
			content: resp.content,
			sendTime: resp.sendTime
		}]
	}))

	if (getStateUser().activeMenu === 'chatMenu' && getStateUser().activeChat === resp.talkId) {
		console.log("[handleC2CPushResp] cur page, not mention")
		return
	}
	store.dispatch(setUnreadNum({
		talkId: resp.talkId,
		num: 1
	}))
}

function getStateUser() {
	return store.getState().user;
}

const addAckQueue = (seqId, data) => {
	ackMap.set(seqId, data)
};

export {
	handleMessage, addAckQueue
}