import { messageType } from './messageType'
import store from '../../store/index'
import {updateChatRecord} from '../../store/features/TalkRecord'

const ackMap = new Map();
const commandMap = new Map();

commandMap.set(messageType.C2CSendResponseMessage.code, messageType.C2CSendResponseMessage);
commandMap.set(messageType.C2CPushRequestMessage.code, messageType.C2CPushRequestMessage);

const handleMessage = (command, seqId, data) => {
	let type = commandMap.get(command);
	switch (type) {
		case messageType.C2CSendResponseMessage:
			handleC2CSendResp(data);
			break;
		case messageType.C2CPushRequestMessage:
			break;
	}
};

const handleC2CSendResp = (resp) => {
	let seqId = resp.seqId;
	let data = ackMap.get(seqId);

	ackMap.delete(seqId);
	// 更新 聊天记录列表
	store.dispatch(updateChatRecord({
		talkId: data.to,
		records: [{
			'msgId': seqId,
			'msgType': 0,
			'fromId': data.from,
			'from': 'user_1',
			'toId': data.to,
			'to': 'user_1"',
			'content': data.content,
			'msgTime': data.msgTime
		}]
	}))
};

const addAckQueue = (seqId, data) => {
	ackMap.set(seqId, data)
};

export {
	handleMessage, addAckQueue
}