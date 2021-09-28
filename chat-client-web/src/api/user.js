import request from "../common/js/request";

export function loginByAccount(account, password) {
	return request({
		url: '/user/login-by-account',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

export function getTalkList(userId) {
	return request({
		url: '/chat/talk-list',
		method: 'GET',
		params: {
			userId
		}
	})
}

export function getContactList(userId) {
	return request({
		url: '/contact/get-contacts',
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

export function searchByAccount(account) {
	return request({
		url: '/user/search-by-account',
		method: 'GET',
		params: {
			account
		}
	})
}

export function addContact(mainUserId, subUserId) {
	return request({
		url: '/contact/add-contact',
		method: 'GET',
		params: {
			mainUserId,
			subUserId
		}
	})
}

export function getTalkId(mainUserId, subUserId) {
	return request({
		url: '/'
	})
}