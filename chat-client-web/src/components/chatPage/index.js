import React, {useState} from "react";
import './chatPage.css'
import { Image, Button, Input } from 'antd'
import ReactWEditor from 'wangeditor-for-react';
import {useSelector} from "react-redux";
import img1 from '../../common/images/avator.png'

const { TextArea } = Input;

export default function ChatPage() {
	const { activeMenu, activeChat, userInfo, page } = useSelector(state => state.user);
	const type = page.type;
	const data = page.data;

	if (activeMenu === 'chatMenu' && type === 'chatPage') {
		return (
			<div style={{height: '100%', width: 'calc(100% - 370px)', backgroundColor: '#f3f3f3'}}>
				<div style={{borderBottom: 'solid 1px #e0e0e0', height: '70px'}}>
					<div style={{ fontSize: '20px', paddingTop: '25px', paddingLeft: '25px' }}>
						{data.talkName}
					</div>
				</div>

				<div style={{borderBottom: 'solid 1px #e0e0e0', height: 'calc((100% - 80px) * 0.7)'}}>
					<div>聊天记录区</div>
				</div>

				<div style={{height: 'calc((100% - 70px) * 0.3)'}}>
					<div style={{ }}>
						
					</div>

				</div>
			</div>
		)
	} else if (activeMenu === 'contactMenu' && type === 'contactInfoPage') {
		return (
			<div style={{ marginTop: '140px', marginLeft: '90px', width: '400px', flexShrink: '1', display: 'flex', flexDirection: 'column' }}>
				<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '30px' }}>
					<div style={{ width: '80%' }}>
						<div style={{ fontSize: '24px', fontWeight: '500' }}>{data.username}</div>
						<div style={{ paddingTop: '8px' }}>{data.signature}</div>
					</div>
					<div style={{ width: '20%' }}>
						<Image src={img1} width='80px'/>
					</div>
				</div>
				<div style={{ borderBottom: 'solid 1px #d0d0d0', padding: '30px 0' }}>
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
				<div style={{ padding: '30px 140px 0 140px' }}>
					<Button type='primary' style={{ width: '120px' }}>
						发消息
					</Button>
				</div>
			</div>
		)
	} else {
		return (
			<div style={{height: '100%', width: 'auto'}}>

			</div>
		)
	}
}