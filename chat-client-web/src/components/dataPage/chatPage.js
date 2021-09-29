import {Avatar, Image, List, message, Spin, Tooltip, Input} from "antd";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import img2 from "../../common/images/emoji.svg";
import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import WebSocketInstance from '../websocket/socketInstance'
import {useSelector} from "react-redux";
import {getAvatar} from "../common/avatar";
import {formatDate, getDateTime} from "../common/time";

const { TextArea } = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const recordEnd = useRef(null);

	const { userInfo, activeChat, chatRecords } = useSelector(state => state.user);
	let chatRecord;
	for (let [key, value] of chatRecords) {
		if (key === activeChat) {
			chatRecord = value;
		}
	}

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

	const showTime = (timestamp, index) => {
		let curTime = new Date().getTime();
		// 5 分钟内不显示
		if (curTime - timestamp < 300000) {
			return false
		}
		// 第一条 最后一条 显示
		if (index === 0) {
			return true;
		}
		let nextDate = chatRecord.records[index - 1].sendTime;
		return !(formatDate(new Date(parseInt(timestamp)), "yyyy/MM/dd hh:mm")
			== formatDate(new Date(parseInt(nextDate)), "yyyy/MM/dd hh:mm"))
	}

	return (
		<div style={{height: '100%', width: 'calc(100% - 330px)', backgroundColor: '#f3f3f3'}}>
			<div style={{borderBottom: 'solid 1px #e0e0e0', height: '64px'}}>
				<div style={{ fontSize: '18px', paddingTop: '24px', paddingLeft: '24px' }}>
					{chatRecord.talkName}
				</div>
			</div>

			<div style={{borderBottom: 'solid 1px #e0e0e0', height: 'calc(100% - 264px)', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
				<div style={{ overflow: 'auto' }}>
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={handleInfiniteOnLoad}
						hasMore={true}
						useWindow={false}
					>
						<List className='chatPage'
							dataSource={ chatRecord.records }
							renderItem={ (record, index) => {
								let isShowTime = showTime(record.sendTime, index)
								return (
									<List.Item key={record.msgId}
														 style={{ display: 'flex' }}
														 className={record.fromId === userInfo.userId ? 'keep-right' : 'keep-left'}>
										<div className='chatPageAvatar' style={{ paddingTop: (isShowTime ? '36px' : '0') }}>
											{ record.fromId === userInfo.userId ? getAvatar(userInfo.avatarUrl, userInfo.account, userInfo.nickname, 40) :
												getAvatar(chatRecord.avatarUrl, chatRecord.account, chatRecord.talkName, 40) }
										</div>
										<div className='chatPageContent' >
											{ !isShowTime ? <div/> :
												<div style={{ textAlign: 'center', paddingBottom: '14px' }}> {getDateTime(record.sendTime, true)} </div>
											}
											<div className='titleOrMsg'>
												{ (parseInt(chatRecord.talkType) === 0) ? <div/> : <div>{record.from}</div>
												}
											</div>
											<div className='titleOrMsg'>
												<div style={{ display: 'inline-block', padding: '9px 14px', color: '#000', borderRadius: '5px', maxWidth: '60%' }}
														 className={record.fromId === userInfo.userId ? 'myMsgBackgroundColor' : 'otherMsgBackgroundColor'}>
													{record.content}
												</div>
											</div>
										</div>
									</List.Item>
								)
							}}
						>
							{ loading && (
								<div className="demo-loading-container">
									<Spin />
								</div>
							)}
						</List>
					<div ref={recordEnd}/>
					</InfiniteScroll>
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