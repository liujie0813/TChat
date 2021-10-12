import store from "../../store";
import {getContactList, getGroupList, getTalkList} from "./user";
import {initChatRecord, setChatData, setContactList, setGroupList} from "../../store/features/userSlice";

// 获取会话列表
export const toGetTalkList = (userId, activeChat) => {
	let resp = getTalkList(userId);
	resp.then(data => {
		store.dispatch(initChatRecord(data))
		if (activeChat) {
			store.dispatch(setChatData({
				type: 1,
				key: data[0].talkId
			}))
		}
	})
};

// 获取联系人列表
export const toGetContactList = (userId) => {
	let resp = getContactList(userId);
	resp.then(data => {
		store.dispatch(setContactList(data));
	});
};

export const toGetGroupList = (userId) => {
	let resp = getGroupList(userId);
	resp.then(data => {
		store.dispatch(setGroupList(data));
	});
}

