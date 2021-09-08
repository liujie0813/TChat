import React, {useState} from "react";
import './chatPage.css'
import {Button, Image, Input, message, Tooltip} from 'antd'
import Picker, {SKIN_TONE_NEUTRAL} from 'emoji-picker-react';
import {useSelector} from "react-redux";
import img1 from '../../common/images/avator.png'
import img2 from '../../common/images/emoji.svg'
import {sendMsg} from "../websocket";

const {TextArea} = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');

	const { userInfo, activeMenu, page } = useSelector(state => state.user);
	const type = page.type;
	const data = page.data;

	const onChange = (e) => {
		setContent(e.target.value)
	};

	const onEmojiClick = (event, emojiObject) => {
		setContent(content + emojiObject.emoji)
	};

	const sendMessage = (e) => {
		if (e.key === 'Enter') {
			if (e.shiftKey) {
				return;
			}
			// 阻止换行行为
			e.preventDefault()
		}
		const v = e.target.value;
		if (v.replace(/(^\s+)|(\s+$)/g, '') === '') {
			message.warn("不能发送空格");
			return
		}
		/**
     * String from
     * String to
     * String content
     * Long timestamp
		 */
		sendMsg(4,{
			from: userInfo.userId,
			to: data.talkId,
			content: v,
			timestamp: new Date().getTime()
		});
		setContent('')
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
							onChange={onChange}
							placeholder='Hello, TChat !!!'
							onPressEnter={sendMessage}
							/>
					</div>

				</div>
			</div>
		)
	} else if (activeMenu === 'contactMenu' && type === 'contactInfoPage') {
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