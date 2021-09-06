import {createSlice} from '@reduxjs/toolkit';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';
import {act} from "@testing-library/react";

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
		activeMenu: { key: 'chatMenu' },
		chatMenuImg: { img: img3 },
		contactMenuImg: { img: img4 },
		contactList: [],
		contactMap: {},
		activeContact: null,
		chatList: [],
		chatMap: {},
		activeChat: null,
		page: {
			type: 'chatPage', // chatPage：聊天页；groupInfoPage：群组信息页；contactInfoPage：联系人信息页
			data: {}
		}
	},
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		setMenuImg: (state, action) => {
			if (action.payload === 'chatMenu') {
				state.chatMenuImg.img = img3
				state.contactMenuImg.img = img4
			} else if (action.payload === 'contactMenu') {
				state.chatMenuImg.img = img2
				state.contactMenuImg.img = img5
			}
		},
		setActiveMenu: (state, action) => {
			state.activeMenu.key = action.payload
		},
		setContactList: (state, action) => {
			state.contactList = action.payload
			let contactMap = new Map();
			action.payload.forEach(contact => {
				contactMap.set(contact.userId, contact)
			})
			state.contactMap = contactMap
		},
		setActiveContact: (state, action) => {
			state.activeContact = action.payload;
		},
		setChatList: (state, action) => {
			state.chatList = action.payload
			let chatMap = new Map();
			action.payload.forEach(chat => {
				chatMap.set(chat.conversationId, chat)
			})
			state.chatMap = chatMap
		},
		setActiveChat: (state, action) => {
			state.activeChat = action.payload;
		},
		setPage: (state, action) => {
			state.page.type = action.payload.type;
			let value
			if (action.payload.type === 'contactInfoPage') {
				value = state.contactMap.get(parseInt(action.payload.data))
			} else if (action.payload.type === 'chatPage') {
				value = state.contactMap.get(parseInt(action.payload.data))
			}
			state.page.data = value;
		}
	},
	extraReducers: {}
});

export const {
	setUserInfo, setMenuImg, setActiveMenu, setContactList, setActiveContact, setPage,
	setChatList, setActiveChat
} = userSlice.actions;

export default userSlice.reducer