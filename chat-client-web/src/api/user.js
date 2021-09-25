import request from "../common/js/request";

export function loginByAccount(account, password) {
	return request({
		url: '/user/login',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

export function getTalkList(userId) {
	return request({
		url: '/chat/talkList',
		method: 'GET',
		params: {
			userId
		}
	})
}

export function getContactList(userId) {
	return request({
		url: '/contact/getContactList',
		method: 'GET',
		params: {
			userId
		}
	})
}

export function getChatRecords(userId) {
	return request({
		url: '/chat/chatRecords',
		method: 'GET',
		params: {
			userId
		}
	})
}