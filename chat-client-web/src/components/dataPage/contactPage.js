import {Button, Image} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setOrUpdateChatData} from '../../store/features/userSlice'
import img1 from '../../common/images/avator/boy_avator01.svg';
import img2 from '../../common/images/avator/boy_avator02.svg';
import img3 from '../../common/images/avator/boy_avator03.svg';
import img4 from '../../common/images/avator/girl_avator01.svg';
import img5 from '../../common/images/avator/girl_avator02.svg';
import img6 from '../../common/images/avator/girl_avator03.svg';
import {getAvatar} from "../person/personInfo";

export default function ContactPage() {
	const { page } = useSelector(state => state.user);
	const data = page.data;
	const dispatch = useDispatch();

	const jumpChatPage = (talkType) => {
		console.log("jumpChatPage: ", data.userId.toString());
		dispatch(setOrUpdateChatData({
			talkId: data.talkId,
			userId: data.userId,
			talkType
		}))
	};

	return (
		<div style={{ padding: '120px 300px 0 120px', width: 'calc(100% - 330px)', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '40px', minWidth: '420px' }}>
				<div style={{ width: 'calc(100% - 120px)', minWidth: '300px' }}>
					<div style={{ fontSize: '24px', fontWeight: '500' }}>{data.nickname}</div>
					<div style={{ paddingTop: '8px' }}>{data.signature ? data.signature : 'ta没有说什么'}</div>
				</div>
				<div style={{ width: '120px' }}>
					{ getAvatar(data.avatar, data.account, data.nickname, 108) }
				</div>
			</div>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', padding: '40px 0', minWidth: '420px' }}>
				<div style={{ paddingBottom: '10px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{data.account}</span>
				</div>
				<div style={{ paddingBottom: '10px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{data.gender ? data.gender : '未知'}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{(data.privince || data.city) ? data.province + ' ' + data.city : '未知'}</span>
				</div>
			</div>
			<div style={{ paddingTop: '40px', paddingLeft: 'calc((100% - 120px) / 2)' }}>
				<Button type='primary' style={{ width: '120px' }} onClick={() => { jumpChatPage(0)}}>
					发消息
				</Button>
			</div>
		</div>
	)
}