import {createSlice} from '@reduxjs/toolkit';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		authToken: {},
		userInfo: {},
		activeMenu: 'chatMenu',
		chatMenuImg: { img: img3 },
		contactMenuImg: { img: img4 },
		contactList: [],
		contactMap: {},
		activeContact: null,
		activeChat: null,
		page: {
			type: null, // chatPage：聊天页；groupInfoPage：群组信息页；contactInfoPage：联系人信息页
			data: {}
		},
		chatRecords: null
	},
	reducers: {
		setAuthToken: (state, { payload }) => {
			state.authToken = payload;
		},
		setUserInfo: (state, { payload }) => {
			state.userInfo = payload;
		},
		setLoginResp: (state, { payload }) => {
			state.authToken.accessToken = payload.accessToken;
			state.authToken.refreshToken = payload.refreshToken;
			state.userInfo = payload.userInfoDTO;
		},
		setContactList: (state, action) => {
			state.contactList = action.payload;
			action.payload.forEach(contact => {
				state.contactMap[contact.account] = contact
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
			state.page.data = action.payload;
		},
		setContactData: (state, action) => {
			state.activeContact = action.payload;
			state.page.type = "contactInfoPage";
			state.page.data = state.contactMap[action.payload]
		},
		setOrUpdateChatData: (state, action) => {
			state.activeMenu = "chatMenu";
			state.chatMenuImg.img = img3;
			state.contactMenuImg.img = img4;

			let talkId = action.payload.talkId;
			let account = action.payload.account;
			state.activeChat = talkId.toString();
			state.page.type = "chatPage";
			if (!state.chatRecords[talkId]) {
				let contact = state.contactMap[account];
				state.chatRecords[talkId] = {
					talkType: action.payload.talkType,
					talkId: talkId,
					userId: contact.userId,
					account: contact.account,
					talkName: contact.nickenameRemark ? contact.nickenameRemark : contact.nickname,
					avatarUrl: contact.avatarUrl,
					unreadNum: 0,
					records: []
				}
			}
		},
		initChatRecord: (state, { payload }) => {
			state.chatRecords = new Map()
			for (const chatRecord of payload) {
				state.chatRecords.set(chatRecord.talkId, chatRecord)
			}
		},
		updateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload;
			console.log('before: ', state.chatRecords[talkId].records.length);
			let originRecords = state.chatRecords[talkId].records;
			state.chatRecords[talkId].records = originRecords.concat(records);
			console.log('after: ', state.chatRecords[talkId].records.length);
		},
		historyUpdateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload;
			state.chatRecords[talkId].unshift(records)
		},
		logout: (state, action) => {
			console.log('[logout]')
		}
	},
	extraReducers: {}
});

export const {
	setAuthToken, setLoginResp,
	setUserInfo,
	setChatList, setContactList,
	setMenuData, setChatData, setContactData,
	setOrUpdateChatData,
	initChatRecord, updateChatRecord, historyUpdateChatRecord,
	logout
} = userSlice.actions;

export default userSlice.reducer