import React, {useEffect, useMemo, useRef, useState} from "react";
import './chatPage.css'
import {Button, Image, Input, Tooltip, message} from 'antd'
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import {useSelector} from "react-redux";
import img1 from '../../common/images/avator.png'
import img2 from '../../common/images/emoji.svg'

const {TextArea} = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');

	const { activeMenu, page } = useSelector(state => state.user);
	const type = page.type;
	const data = page.data;

	const onEmojiClick = (event, emojiObject) => {
		console.log(emojiObject);
		setContent(content + emojiObject.emoji)
	};

	if (activeMenu === 'chatMenu' && type === 'chatPage') {
		return (
			<div style={{height: '100%', width: 'calc(100% - 330px)', backgroundColor: '#f3f3f3'}}>
				<div style={{borderBottom: 'solid 1px #e0e0e0', height: '60px'}}>
					<div style={{ fontSize: '16px', paddingTop: '20px', paddingLeft: '20px' }}>
						{data.talkName}
					</div>
				</div>

				<div style={{borderBottom: 'solid 1px #e0e0e0', height: 'calc(100% - 260px)'}}>
					<div style={{ paddingLeft: '20px' }}>
						聊天记录区
					</div>
				</div>

				<div style={{height: '200px', backgroundColor: '#fff'}}>
					<div style={{ padding: '10px 0 0 16px' }}>
						<Tooltip
							trigger='click'
							title={
								<Picker
									onEmojiClick={onEmojiClick}
									skinTone={SKIN_TONE_NEUTRAL}
									disableSkinTonePicker={false}
									pickerStyle={{ width: '500px' }}
								/>
							}
							overlayInnerStyle={{ padding: '0px'}}
						>
							<Image src={img2} height={28} preview={false} />
						</Tooltip>
					</div>
					<div style={{ paddingLeft: '6px' }}>
						<TextArea
							style={{
								resize: 'none',
								width: '100%',
								fontSize: '14px',
								lineHeight: '24px'
							}}
							spellCheck={false}
							rows={5}
							value={content}
							bordered={false}
							placeholder='Hello, TChat !!!'
							/>
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