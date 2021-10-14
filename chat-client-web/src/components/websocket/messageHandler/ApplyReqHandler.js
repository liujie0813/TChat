import BaseMessageHandler from "./baseMessageHandler";
import {toGetApplyList} from "../../api/userEncapsulation";

export default class ApplyRequestMessageHandler extends BaseMessageHandler {

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
		console.log('[ WS ] [ applyReq ] recv msg: ', this.resp)
		let userInfo = this.getUserState().userInfo;
		toGetApplyList(userInfo.userId);
	}

}