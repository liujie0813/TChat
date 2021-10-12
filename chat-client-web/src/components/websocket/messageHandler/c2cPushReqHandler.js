import store from "../../../store";
import {updateChatRecord} from "../../../store/features/userSlice";
import BaseMessageHandler from "./baseMessageHandler";
import AckQueue from '../ackQueue'

export default class C2CPushRequestMessageHandler extends BaseMessageHandler {

	/**
	 * seqId
	 * data
	 */
	resp

	constructor(resp) {
		super();

		this.resp = resp;
	}

	handle = () => {
		console.log('[ WS ] [ c2cPushReq ] recv msg: ', this.resp)
		let userState = this.getUserState();

		let updateUnreadNum = !userState.activeMenu === 'chatMenu' || !userState.activeChat || userState.activeChat.key !== this.resp.talkId;
		store.dispatch(updateChatRecord({
			talkId: this.resp.talkId,
			records: [{
				msgId: this.resp.msgId,
				msgType: 0,
				fromId: this.resp.fromId,
				from: userState.userIdMap[this.resp.fromId],
				content: this.resp.content,
				sendTime: this.resp.sendTime
			}],
			updateUnreadNum
		}))
	}

}