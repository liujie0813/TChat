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
			action.payload.forEach(chat => {
				state.chatMap[chat.talkId] = chat
			});
		},
		setContactList: (state, action) => {
			state.contactList = action.payload;
			action.payload.forEach(contact => {
				state.contactMap[contact.userId] = contact
			});
		},
		setMenuData: (state, action) => {
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
			state.activeChat = action.payload;
			state.page.type = "chatPage";
			state.page.data = state.chatMap[parseInt(action.payload)]
		},
		setContactData: (state, action) => {
			state.activeContact = action.payload;
			state.page.type = "contactInfoPage";
			state.page.data = state.contactMap[parseInt(action.payload)]
		},
		setOrUpdateChatData: (state, action) => {
			state.activeMenu = "chatMenu";
			state.chatMenuImg.img = img3;
			state.contactMenuImg.img = img4;

			state.activeChat = action.payload.talkId;
			state.page.type = "chatPage";
			if (state.chatMap.hasOwnProperty(parseInt(action.payload.talkId))) {
				state.page.data = state.chatMap[parseInt(action.payload.talkId)]
			} else {
				let contact = state.contactMap[parseInt(action.payload.talkId)];
				let chatListItem = {
					type: action.payload.type,
					talkId: action.payload.talkId,
					talkName: contact.username,
					latestSender: null,
					latestMsg: null,
					msgTime: null,
				};
				state.chatList.push(chatListItem);
				state.chatMap[action.payload.talkId] = chatListItem;
				state.page.data = chatListItem
			}
		}
	},
	extraReducers: {}
});

/**
 * type(pin):0
talkId(pin):0
talkName(pin):"user_0"
latestSender(pin):null
latestMsg(pin):"hello, 5"
msgTime(pin):"2021-09-15 00:35:29"
 */

export const {
	setUserInfo,
	setChatList, setContactList,
	setMenuData, setChatData, setContactData,
	setOrUpdateChatData
} = userSlice.actions;

export default userSlice.reducer