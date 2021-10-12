import {Modal} from "antd";
import {getRefreshToken, setLoginToken} from "../../../common/js/accessToken";
import servicef from "../../../common/js/request";
import WebSocketInstance from "../tchatWebSocket";
import {messageType} from "../messageType";
import BaseMessageHandler from "./baseMessageHandler";

export default class AuthResponseMessageHandler extends BaseMessageHandler {

	resp

	constructor(resp) {
		super();

		this.resp = resp;
	}

	handle = () => {
		console.log('[ WS ] [ authResp ] recv msg:', this.resp)
		const code = this.resp.code;
		if (code === 0) {
			return
		}

		if (code === 102001    // 访问令牌不存在
			|| code === 102003 // 刷新令牌不存在
			|| code === 102004) { // 刷新令牌已过期
			Modal.confirm({
				title: '系统提示',
				content: this.resp.msg,
				okText: '重新登录',
				onOk: function (e) {
					history.push('/login')
				}
			})
		} else if (code === 102002) { // 访问令牌已过期
			this.refreshTokenAndAuth();
		} else {
			Modal.warn({
				title: '系统提示',
				content: this.resp.msg,
			})
		}
	}

	refreshTokenAndAuth = () => {
		let refreshToken = getRefreshToken();
		return servicef({
			url: '/user/refresh-token',
			method: 'GET',
			params: {
				refreshToken
			}
		}).then(data => {
			setLoginToken(data.accessToken, data.refreshToken)
			WebSocketInstance.sendMsg(messageType.AuthRequestMessage, {
				accessToken: data.accessToken
			})
		})
	}

}