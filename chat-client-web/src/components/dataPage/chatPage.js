import {Avatar, Image, List, message, Spin, Tooltip, Input} from "antd";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import img2 from "../../common/images/emoji.svg";
import React, {useEffect, useRef, useState} from "react";
import {sendMsg} from "../websocket";
import {useSelector} from "react-redux";

const { TextArea } = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const recordEnd = useRef(null);

	const { userInfo, page } = useSelector(state => state.user);
	const data = page.data;
	const { chatRecords } = useSelector(state => state.talk);

	const EMPTY_RECORDS = [];

	const scrollToBottom = () => {
		if (recordEnd && recordEnd.current) {
			recordEnd.current.scrollIntoView({behavior: "smooth"});
		}
	};

	if (chatRecords[data.talkId]) {
		useEffect(() => {
			scrollToBottom()
		}, [chatRecords[data.talkId].records]);
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
		sendMsg(4,{
			from: userInfo.userId,
			to: data.talkId,
			content: v,
			timestamp: new Date().getTime()
		});
		setContent('')
	};

	return (
		<div style={{height: '100%', width: 'calc(100% - 330px)', backgroundColor: '#f3f3f3'}}>
			<div style={{borderBottom: 'solid 1px #e0e0e0', height: '60px'}}>
				<div style={{ fontSize: '16px', paddingTop: '20px', paddingLeft: '20px' }}>
					{data.talkName}
				</div>
			</div>

			<div style={{borderBottom: 'solid 1px #e0e0e0', height: 'calc(100% - 260px)', display: 'flex', flexDirection: 'column' }}>
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
						dataSource={chatRecords[data.talkId] ? chatRecords[data.talkId].records : EMPTY_RECORDS}
						renderItem={record => (
							<List.Item key={record.msgId} style={{ height: '80px' }} className={record.fromId === userInfo.userId ? 'keep-right' : 'keep-left'}>
								<List.Item.Meta
									avatar={
										<Avatar size={40} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{record.from}</Avatar>
									}
									title={
										(chatRecords[data.talkId] && chatRecords[data.talkId].type === 0) ? <div/> : <div>{record.from}</div>
									}
									description={
										<div>{record.content}</div>
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