import {createSlice} from '@reduxjs/toolkit';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
		activeMenu: { key: 'chatMenu' },
		chatMenuImg: { img: img3 },
		contactMenuImg: { img: img4 },
		contactList: []
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
			state.contactList = action.payload;
		}
	},
	extraReducers: {}
});

export const { setUserInfo, setMenuImg, setActiveMenu, setContactList } = userSlice.actions;

export default userSlice.reducer