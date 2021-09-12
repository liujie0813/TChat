import { messageType } from './messageType'
import {useDispatch, useSelector} from "react-redux";
import {updateChatRecord} from '../../store/features/TalkRecord'

const ackMap = new Map();
const commandMap = new Map();

commandMap.set(messageType.C2CSendResponseMessage.code, messageType.C2CSendResponseMessage);
commandMap.set(messageType.C2CPushRequestMessage.code, messageType.C2CPushRequestMessage);

const { chatRecords } = useSelector(state => state.talk);
const dispatch = useDispatch();

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

	dispatch(updateChatRecord({
		talkId: data.to,
		records: [{

		}]
	}))
};

const addAckQueue = (seqId, data) => {
	ackMap.set(seqId, data)
};

export {
	handleMessage, addAckQueue
}