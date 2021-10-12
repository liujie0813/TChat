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
		groupList: [],
		groupMap: {},
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

			let chatRecord = state.chatRecordMap[action.payload.key];
			state.totalUnreadNum -= chatRecord.unreadNum;
			state.chatRecordMap[action.payload.key].unreadNum = 0;

			state.chatRecordList.forEach(chatRecord => {
				if (chatRecord.talkId === action.payload.key) {
					chatRecord.unreadNum = 0;
				}
			})
		},
		setContactData: (state, { payload }) => {
			state.activeContact = payload;
			state.page.type = "contactInfoPage";

			if (!payload) {
				return
			}
			if (payload.type === 0) {

			} else if (payload.type === 1) {
				state.page.data = state.groupMap[payload.key]
			} else if (payload.type === 2) {
				state.page.data = state.contactMap[payload.key]
			}
		},
		setGroupList: (state, {payload}) => {
			state.groupList = payload;
			payload.forEach(group => {
				group.memberMap = {}
				group.members.forEach(member => {
					group.memberMap[member.userId] = member
				})
				state.groupMap[group.groupId] = group
			})
		},
		setOrUpdateSingleChatData: (state, action) => {
			state.activeMenu = "chatMenu";
			state.chatMenuImg.img = img3;
			state.contactMenuImg.img = img4;

			let talkId = action.payload.talkId;
			let account = action.payload.account;
			state.activeChat.key = talkId.toString();
			state.page.type = "chatPage";
			if (!state.chatRecordMap[talkId]) {
				let contact = state.contactMap[account];
				let chatRecord = {
					talkType: 0,
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
		setOrUpdateGroupChatData: (state, { payload }) => {
			state.activeMenu = "chatMenu";
			state.chatMenuImg.img = img3;
			state.contactMenuImg.img = img4;

			let talkId = payload.talkId;
			state.activeChat.key = talkId.toString();
			state.page.type = "chatPage";

			if (!state.chatRecordMap[talkId]) {
				let chatRecord = {
					talkType: 1,
					talkId: talkId,
					groupId: payload.groupId,
					talkName: payload.groupNameRemark ? payload.groupNameRemark : payload.groupName,
					avatarUrl: payload.avatarUrl,
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
			let originRecords = [];
			if (state.chatRecordMap[talkId]) {
				originRecords = state.chatRecordMap[talkId].records;
			}
			state.chatRecordMap[talkId].records = originRecords.concat(records);

			state.chatRecordList = [
				state.chatRecordMap[talkId],
				...state.chatRecordList.filter((item, index) => item.talkId !== talkId )
			];

			if (updateUnreadNum) {
				state.totalUnreadNum += records.length;
				state.chatRecordMap[talkId].unreadNum += records.length;
			}
		},
		historyUpdateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload;
			state.chatRecordMap[talkId].record.unshift(records)
		},
		logout: (state, action) => {
		}
	},
	extraReducers: {}
});

export const {
	setAuthToken, setLoginResp,
	setUserInfo,
	setChatList, setContactList,
	setGroupList,
	setMenuData, setChatData, setContactData,
	setOrUpdateSingleChatData, setOrUpdateGroupChatData,
	initChatRecord, updateChatRecord, historyUpdateChatRecord,
	logout
} = userSlice.actions;

export default userSlice.reducer