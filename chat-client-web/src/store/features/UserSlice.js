import { message } from 'antd';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
	"user/login",
	async (params) => {
		const { data } = await axios.get('http://localhost:18080/user/login', { params: params })
		return data
	},
)

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {},
	},
	reducers: {},
	extraReducers: {
		[login.fulfilled]: (state, { data }) => {
			console.log(data)
			if (data.code === 0) {
				this.props.push('/home')
			} else {
				message.warn(data.msg)
			}
		},
		[login.rejected]: (state, action) => {
			message.error(state, action)
		},
	}
})

export default userSlice.reducer