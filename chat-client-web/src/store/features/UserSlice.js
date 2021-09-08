import {createSlice} from '@reduxjs/toolkit';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
		activeMenu: 'chatMenu',
		chatMenuImg: { img: img3 },
		contactMenuImg: { img: img4 },
		contactList: [],
		contactMap: {},
		activeContact: null,
		chatList: [],
		chatMap: {},
		activeChat: null,
		page: {
			type: null, // chatPage：聊天页；groupInfoPage：群组信息页；contactInfoPage：联系人信息页
			data: {}
		}
	},
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		},
		setChatList: (state, action) => {
			state.chatList = action.payload;
			let chatMap = new Map();
			action.payload.forEach(chat => {
				chatMap.set(chat.talkId, chat)
			});
			state.chatMap = chatMap
		},
		setContactList: (state, action) => {
			state.contactList = action.payload;
			let contactMap = new Map();
			action.payload.forEach(contact => {
				contactMap.set(contact.userId, contact)
			});
			state.contactMap = contactMap
		},
		setMenuData: (state, action) => {
			console.log(action.payload);
			state.activeMenu = action.payload;
			if (action.payload === 'chatMenu') {
				state.chatMenuImg.img = img3;
				state.contactMenuImg.img = img4;
			} else if (action.payload === 'contactMenu') {
				state.chatMenuImg.img = img2;
				state.contactMenuImg.img = img5;
			}
		},
		setChatData: (state, action) => {
			console.log(action.payload);
			state.activeChat = action.payload;
			state.page.type = "chatPage";
			state.page.data = state.chatMap.get(parseInt(action.payload))
		},
		setContactData: (state, action) => {
			console.log(action.payload);
			state.activeContact = action.payload;
			state.page.type = "contactInfoPage";
			state.page.data = state.contactMap.get(parseInt(action.payload))
		}
	},
	extraReducers: {}
});

export const {
	setUserInfo,
	setChatList, setContactList,
	setMenuData, setChatData, setContactData
} = userSlice.actions;

export default userSlice.reducer