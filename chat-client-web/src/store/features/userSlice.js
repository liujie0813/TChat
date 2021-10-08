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
		userIdMap: {},
		page: {
			type: null, // chatPage：聊天页；groupInfoPage：群组信息页；contactInfoPage：联系人信息页
			data: {}
		},
		totalUnreadNum: 0,
		chatRecordList: [],
		chatRecordMap: {}
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

				state.userIdMap[contact.userId] = (contact.nickenameRemark ?
					contact.nickenameRemark :
					(contact.nickname ? contact.nickname : contact.account)
				);
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

			let chatRecord = state.chatRecordMap[action.payload];
			state.totalUnreadNum -= chatRecord.unreadNum;
			state.chatRecordMap[action.payload].unreadNum = 0;

			state.chatRecordList.forEach(chatRecord => {
				if (chatRecord.talkId === action.payload) {
					chatRecord.unreadNum = 0;
				}
			})
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
			if (!state.chatRecordMap[talkId]) {
				let contact = state.contactMap[account];
				let chatRecord = {
					talkType: action.payload.talkType,
					talkId: talkId,
					userId: contact.userId,
					account: contact.account,
					talkName: contact.nickenameRemark ? contact.nickenameRemark : contact.nickname,
					avatarUrl: contact.avatarUrl,
					unreadNum: 0,
					records: []
				};

				state.chatRecordMap[talkId] = chatRecord;
				state.chatRecordList = [
					chatRecord,
					...state.chatRecordList
				]
			}
		},
		initChatRecord: (state, { payload }) => {
			state.chatRecordList = payload;
			let totalUnreadNum = 0;
			payload.forEach(chatRecord => {
				state.chatRecordMap[chatRecord.talkId] = chatRecord;
				totalUnreadNum += chatRecord.unreadNum
			});
			state.totalUnreadNum = totalUnreadNum
		},
		updateChatRecord: (state, { payload }) => {
			const { talkId, records, updateUnreadNum } = payload;
			let originRecords = state.chatRecordMap[talkId].records;
			state.chatRecordMap[talkId].records = originRecords.concat(records);

			state.chatRecordList = [
				state.chatRecordMap[talkId],
				...state.chatRecordList.filter((item, index) => item.talkId !== talkId )
			];

			if (updateUnreadNum) {
				let num = records.length;
				state.totalUnreadNum += num;
				state.chatRecordMap[talkId].unreadNum += num;
				state.chatRecordList.forEach(chatRecord => {
					if (chatRecord.talkId === talkId) {
						chatRecord.unreadNum += num;
					}
				})
			}
		},
		historyUpdateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload;
			state.chatRecordMap[talkId].unshift(records)
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