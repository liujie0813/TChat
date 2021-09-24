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

export default function ContactPage() {
	const { page } = useSelector(state => state.user);
	const data = page.data;
	const dispatch = useDispatch();

	const jumpChatPage = (type) => {
		console.log("jumpChatPage: ", data.userId.toString());
		dispatch(setOrUpdateChatData({
			talkId: data.userId.toString(),
			type
		}))
	};

	return (
		<div style={{ padding: '120px 300px 0 120px', width: 'calc(100% - 330px)', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '40px', minWidth: '420px' }}>
				<div style={{ width: 'calc(100% - 120px)', minWidth: '300px' }}>
					<div style={{ fontSize: '24px', fontWeight: '500' }}>{data.username}</div>
					<div style={{ paddingTop: '8px' }}>{data.signature}</div>
				</div>
				<div style={{ width: '120px' }}>
					<Image src={img1} width='120px'/>
				</div>
			</div>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', padding: '40px 0', minWidth: '420px' }}>
				<div style={{ paddingBottom: '10px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{data.account}</span>
				</div>
				<div style={{ paddingBottom: '10px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{data.sex}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{data.province} {data.city}</span>
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