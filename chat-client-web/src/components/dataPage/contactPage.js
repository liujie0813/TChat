import {Button} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setOrUpdateGroupChatData, setOrUpdateSingleChatData} from '../../store/features/userSlice'
import {getAvatar} from "../common/avatar";

export default function ContactPage() {
	const { activeContact, page } = useSelector(state => state.user);
	const data = page.data;
	const dispatch = useDispatch();

	const jumpChatPage = (talkType) => {
		console.log("jumpChatPage: ", data.talkId.toString());
		if (talkType === 0) {
			dispatch(setOrUpdateSingleChatData({
				talkId: data.talkId,
				account: data.account
			}))
		} else if (talkType === 1) {
			dispatch(setOrUpdateGroupChatData({
				talkId: data.talkId,
				groupId: data.groupId,
			}))
		}
	};

	if (!activeContact.type) {
		return (
			<div/>
		)
	}
	if (activeContact.type === 1) {
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
	} else if (activeContact.type === 2) {
		return (
			<div style={{ padding: '120px 300px 0 120px', width: 'calc(100% - 330px)', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
				<div style={{borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '40px', minWidth: '420px'}}>
					<div style={{width: 'calc(100% - 120px)', minWidth: '300px'}}>
						<div style={{fontSize: '24px', fontWeight: '500'}}>{data.nickname}</div>
						<div style={{paddingTop: '8px'}}>{data.signature ? data.signature : 'ta没有说什么'}</div>
					</div>
					<div style={{width: '120px'}}>
						{getAvatar(data.avatar, 0, data, 108)}
					</div>
				</div>
				<div style={{borderBottom: 'solid 1px #d0d0d0', padding: '40px 0', minWidth: '420px'}}>
					<div style={{paddingBottom: '10px'}}>
						<span style={{color: '#b0b0b0'}}>账 号</span>
						<span style={{paddingLeft: '40px'}}>{data.account}</span>
					</div>
					<div style={{paddingBottom: '10px'}}>
						<span style={{color: '#b0b0b0'}}>性 别</span>
						<span style={{paddingLeft: '40px'}}>{data.gender ? data.gender : '未知'}</span>
					</div>
					<div>
						<span style={{color: '#b0b0b0'}}>地 区</span>
						<span
							style={{paddingLeft: '40px'}}>{(data.privince || data.city) ? data.province + ' ' + data.city : '未知'}</span>
					</div>
				</div>
				<div style={{paddingTop: '40px', paddingLeft: 'calc((100% - 120px) / 2)'}}>
					<Button type='primary' style={{width: '120px'}} onClick={() => {
						jumpChatPage(0)
					}}>
						发消息
					</Button>
				</div>
			</div>
		)
	}

}