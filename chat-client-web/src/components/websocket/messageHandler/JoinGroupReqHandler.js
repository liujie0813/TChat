import store from "../../../store";
import {updateChatRecord} from "../../../store/features/userSlice";
import BaseMessageHandler from "./baseMessageHandler";
import AckQueue from '../ackQueue'
import {toGetGroupList, toGetTalkList} from "../../api/userEncapsulation";

export default class JoinGroupRequestMessageHandler extends BaseMessageHandler {

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
		console.log('[ WS ] [ joinGroupReq ] recv msg: ', this.resp)
		let userInfo = this.getUserState().userInfo;
		toGetGroupList(userInfo.userId)
		toGetTalkList(userInfo.userId)
	}

}