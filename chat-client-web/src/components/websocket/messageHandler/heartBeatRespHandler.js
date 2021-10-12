import BaseMessageHandler from "./baseMessageHandler";

export default class HeartBeatResponseMessageHandler extends BaseMessageHandler {

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
		console.log('[ WS ] [ heartbeat ] recv heartbeat resp')
	}

}