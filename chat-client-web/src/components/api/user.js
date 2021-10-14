import request from "../../common/js/request";

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

export function getApplyList(userId) {
	return request({
		url: '/contact/get-applys',
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

export function searchByAccount(userId, account) {
	return request({
		url: '/user/search-by-account',
		method: 'GET',
		params: {
			userId,
			account
		}
	})
}

export function applyAddContact(mainUserId, subUserId) {
	return request({
		url: '/contact/apply-add-contact',
		method: 'POST',
		data: {
			mainUserId,
			subUserId
		}
	})
}

export function agreeAddContact(mainUserId, subUserId, nicknameRemark) {
	return request({
		url: '/contact/agree-add-contact',
		method: 'POST',
		data: {
			mainUserId,
			subUserId,
			nicknameRemark
		}
	})
}

export function updateUnreadNum(userId, talkId) {
	return request({
		url: '/chat/update-unread-num',
		method: 'GET',
		params: {
			userId,
			talkId
		}
	})
}

export function createGroup(groupName, createUserId, memberIds) {
	return request({
		url: '/contact/create-group',
		method: 'POST',
		data: {
			groupName,
			createUserId,
			memberIds
		}
	})
}

export function getGroupList(userId) {
	return request({
		url: '/contact/get-groups',
		method: 'GET',
		params: {
			userId
		}
	})
}