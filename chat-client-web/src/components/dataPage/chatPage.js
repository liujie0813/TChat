import {Avatar, Image, List, message, Spin, Tooltip, Input} from "antd";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import img2 from "../../common/images/emoji.svg";
import React, {useEffect, useRef, useState} from "react";
import WebSocketInstance from '../websocket/socketInstance'
import {useSelector} from "react-redux";
import {getAvatar} from "../common/avatar";

const { TextArea } = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const recordEnd = useRef(null);

	const { userInfo, activeChat, chatRecords } = useSelector(state => state.user);
	const chatRecord = chatRecords[activeChat];

	const scrollToBottom = () => {
		if (recordEnd && recordEnd.current) {
			recordEnd.current.scrollIntoView({behavior: "smooth"});
		}
	};

	if (chatRecord) {
		useEffect(() => {
			scrollToBottom()
		}, [chatRecord.records]);
	}

	const handleInfiniteOnLoad = () => {
		console.log("handleInfiniteOnLoad: ")
	};

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
		WebSocketInstance.sendMsg(4,{
			from: userInfo.userId,
			to: chatRecord.userId,
			content: v,
			timestamp: new Date().getTime(),
			talkId: activeChat
		});
		setContent('')
	};

	return (
		<div style={{height: '100%', width: 'calc(100% - 330px)', backgroundColor: '#f3f3f3'}}>
			<div style={{borderBottom: 'solid 1px #e0e0e0', height: '64px'}}>
				<div style={{ fontSize: '18px', paddingTop: '24px', paddingLeft: '24px' }}>
					{chatRecord.talkName}
				</div>
			</div>

			<div style={{borderBottom: 'solid 1px #e0e0e0', height: 'calc(100% - 260px)', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
				<div style={{ overflow: 'auto' }}>
					{/*<InfiniteScroll*/}
					{/*	initialLoad={false}*/}
					{/*	pageStart={0}*/}
					{/*	loadMore={handleInfiniteOnLoad}*/}
					{/*	hasMore={true}*/}
					{/*	useWindow={false}*/}
					{/*>*/}
					<List
						// itemLayout="vertical"
						dataSource={ chatRecord.records }
						renderItem={record => (
							<List.Item key={record.msgId} style={{ height: '72px' }} className={record.fromId === userInfo.userId ? 'keep-right' : 'keep-left'}>
								<List.Item.Meta
									avatar={
										<p>
											{ record.fromId === userInfo.userId ? getAvatar(userInfo.avatarUrl, userInfo.account, userInfo.nickname, 40) :
												getAvatar(chatRecord.avatarUrl, chatRecord.account, chatRecord.talkName, 40) }
										</p>
									}
									title={
										(record.msgType === 0) ? <div className='singleTitle'/> : <div>{record.from}</div>
									}
									description={
										<div style={{ padding: '9px 14px', color: '#000', borderRadius: '5px' }}
												 className={record.fromId === userInfo.userId ? 'myMsgBackgroundColor' : 'otherMsgBackgroundColor'}>
											{record.content}
										</div>
									}
								/>
							</List.Item>
						)}
					>
						{ loading && (
							<div className="demo-loading-container">
								<Spin />
							</div>
						)}
					</List>
					<div ref={recordEnd}/>
					{/*</InfiniteScroll>*/}
					{/*{*/}
					{/*	data.talkId && chatRecords[data.talkId].records.map((record) => {*/}
					{/*		return (*/}
					{/*			<div key={record.msgId} style={{ height: '80px' }}>*/}

					{/*				{record.content}*/}

					{/*			</div>*/}
					{/*		)*/}
					{/*	})*/}
					{/*}*/}
				</div>
			</div>

			<div style={{height: '200px', backgroundColor: '#fff'}}>
				<div style={{ padding: '10px 0 0 30px' }}>
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
				<div style={{ paddingLeft: '20px' }}>
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
}