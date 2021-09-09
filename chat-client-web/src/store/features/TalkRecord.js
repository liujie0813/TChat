import {createSlice} from "@reduxjs/toolkit";

export const talkRecord = createSlice({
	name: 'talk',
	initialState: {
		/*
		 * chatRecords: {
		 *   123: [{
	   *     from: '',
	   *     to: '',
	   *     ...
	   *   },{
	   *     from: '',
	   *     to: '',
	   *     ...
	   *   }]
		 * }
		 */
		chatRecords: {}
	},
	reducers: {
		initChatRecord: (state, { payload }) => {
			const { data } = payload
			for (const chatRecord of data) {
				state.chatRecords[chatRecord.talkId] = chatRecord
			}
		},
		updateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload
			state.chatRecords[talkId].push(...records)
		},
		historyUpdateChatRecord: (state, { payload }) => {
			const { talkId, records } = payload
			state.chatRecords[talkId].unshift(records)
		}
	}
})

export const {
	initChatRecord, updateChatRecord, historyUpdateChatRecord
} = talkRecord.actions;

export default talkRecord.reducer