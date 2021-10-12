import store from "../../../store";
import {updateChatRecord} from "../../../store/features/userSlice";
import BaseMessageHandler from "./baseMessageHandler";
import AckQueue from '../ackQueue'

export default class C2GSendResponseMessageHandler extends BaseMessageHandler {

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
		console.log('[ WS ] [ c2gSendResp ] recv msg: ', this.resp)
		let data = AckQueue.getBySeqId(this.resp.seqId);
		AckQueue.deleteSeqId(this.resp.seqId);

		let userInfo = this.getUserState().userInfo;

		// 更新 聊天记录列表
		store.dispatch(updateChatRecord({
			talkId: data.talkId,
			records: [{
				msgId: this.resp.msgId,
				msgType: 0,
				fromId: data.fromId,
				from: userInfo.nickname,
				content: data.content,
				sendTime: this.resp.sendTime
			}],
			updateUnreadNum: false
		}))
	}

}