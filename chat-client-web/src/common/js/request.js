import axios from 'axios'
import {getAccessToken, getRefreshToken, setLoginToken} from "./accessToken";
import {Modal} from "antd";
import store from "../../store";
import {logout} from "../../store/features/userSlice";

const service = axios.create({
	baseURL: 'http://localhost:18080',
	timeout: 3000,
});

const servicef = function(param) {
	return service(param)
};

service.interceptors.request.use(
	config => {
		console.log('[ HTTP ] [', config.url, '] req param: ', config.method === "get" ? config.params : config.data);
		if (config.url.indexOf('/login-by-account') !== -1
				|| config.url.indexOf('/refresh-token') !== -1) {
			return config;
		}

		if (getAccessToken()) {
			config.headers['Authorization'] = getAccessToken();
		}
		return config;
	},
	error => {

	}
);

function refreshToken(lastResp) {
	let refreshToken = getRefreshToken();
	return servicef({
		url: '/user/refresh-token',
		method: 'GET',
		params: {
			refreshToken
		}
	}).then(data => {
		setLoginToken(data.accessToken, data.refreshToken)
		let config = lastResp.config;
		console.log('[' + refreshToken + ']', config);
		return servicef({
			url: config.url,
			method: config.method,
			params: {
				...config.params,
			}
		})
	})
}

service.interceptors.response.use(
	response => {
		console.log('[ HTTP ] [', response.config.url, '] resp: ', response.data);
		const res = response.data;
		const code = res.code;
		if (code === 0) {
			return res.data;
		}

		if (code === 102001    // 访问令牌不存在
			|| code === 102003 // 刷新令牌不存在
			|| code === 102004) { // 刷新令牌已过期
			Modal.confirm({
				title: '系统提示',
				content: res.msg,
				okText: '重新登录',
				onOk: function (e) {
					store.dispatch(logout())
					history.push('/login')
				}
			})
		} else if (code === 102002) { // 访问令牌已过期
			return refreshToken(response);
		} else {
			Modal.warn({
				title: '系统提示',
				content: res.msg,
			})
			console.log(res)
		}
		return Promise.reject('error')
	},
	error => {
		Modal.error({
			title: '系统提示',
			content: error
		})
		throw new Error(error)
	}
);

export default servicef