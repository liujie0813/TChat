import {getAvatar} from "../../common/avatar";
import {Button} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setOrUpdateGroupChatData} from "../../../store/features/userSlice";

export default function GroupPage() {
	const { page } = useSelector(state => state.user);
	const data = page.data;
	const dispatch = useDispatch();

	const jumpChatPage = () => {
		dispatch(setOrUpdateGroupChatData({
			talkId: data.talkId,
			groupId: data.groupId,
		}))
	}

	return (
		<div style={{ padding: '120px 300px 0 120px', width: 'calc(100% - 330px)', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
			<div style={{width: '108px', margin: '0 auto'}}>
				{getAvatar(data.avatar, 1, data, 108)}
			</div>
			<div style={{paddingTop: '20px', fontSize: '24px', margin: '0 auto'}}>
				{data.groupName}
			</div>
			<div style={{paddingTop: '60px', margin: '0 auto'}}>
				<Button type='primary' style={{width: '120px'}} onClick={() => {
					jumpChatPage(1)
				}}>
					进入群组
				</Button>
			</div>
		</div>
	)
}