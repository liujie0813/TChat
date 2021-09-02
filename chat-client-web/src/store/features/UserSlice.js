import {createSlice} from '@reduxjs/toolkit';
import img2 from '../../common/images/chat_unactive.png';
import img4 from '../../common/images/contact_unacitve.png';
import {act} from "@testing-library/react";

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
	},
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = action.payload;
		}
	},
	extraReducers: {}
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer