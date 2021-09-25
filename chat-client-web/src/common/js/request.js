import axios from 'axios'
import store from '../../store/index'
import {getAccessToken} from "./accessToken";

const service = axios.create({
	baseURL: 'http://localhost:18080',
	timeout: 3000,
});

const servicef = function(param) {
	return service(param)
};

service.interceptors.request.use(
	config => {
		console.log('[' + config.url + '] req param: ', config.method == "GET" ? config.params : config.data);
		if (config.url.indexOf('/login') !== -1
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

service.interceptors.response.use(
	response => {
		console.log('[' + response.config.url + '] resp: ', response.data);
		const res = response.data;
		const code = res.code;
		if (code === 0) {
			return res.data;
		}

		if (code === 102001    // 访问令牌不存在
			|| code === 102003 // 刷新令牌不存在
			|| code === 102004) { // 刷新令牌已过期

		} else if (code === 102002) { // 访问令牌已过期

		} else {

		}
	},
	error => {

	}
);

export default servicef