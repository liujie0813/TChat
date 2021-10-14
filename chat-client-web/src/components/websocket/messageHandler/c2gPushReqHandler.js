import store from "../../../store";
import {updateChatRecord} from "../../../store/features/userSlice";
import BaseMessageHandler from "./baseMessageHandler";
import {toGetTalkList} from "../../api/userEncapsulation";

export default class C2GPushRequestMessageHandler extends BaseMessageHandler {

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
		console.log('[ WS ] [ c2gPushReq ] recv msg: ', this.resp)
		let userState = this.getUserState()
		toGetTalkList(userState.userInfo.userId)

		// let from;
		// if (userState.userIdMap[this.resp.fromId]) {
		// 	from = userState.userIdMap[this.resp.fromId];
		// } else {
		// 	let groupId = userState.chatRecordMap[this.resp.talkId].groupId;
		// 	from = userState.groupMap[groupId].memberMap[this.resp.fromId].nickname;
		// }
		//
		// let updateUnreadNum = userState.activeMenu !== 'chatMenu' || !userState.activeChat || userState.activeChat.key !== this.resp.talkId;
		// store.dispatch(updateChatRecord({
		// 	talkId: this.resp.talkId,
		// 	records: [{
		// 		msgId: this.resp.msgId,
		// 		msgType: 0,
		// 		fromId: this.resp.fromId,
		// 		from: from,
		// 		content: this.resp.content,
		// 		sendTime: this.resp.sendTime
		// 	}],
		// 	updateUnreadNum
		// }))
	}

}