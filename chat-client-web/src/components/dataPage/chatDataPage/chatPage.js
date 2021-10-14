import {Button, Image, Input, List, message, Spin, Tooltip} from "antd";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import img2 from "../../../common/images/emoji.svg";
import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {useSelector} from "react-redux";
import {getAvatar} from "../../common/avatar";
import {getDateTime} from "../../common/time";
import {messageType} from "../../websocket/messageType";
import {getCreateSingleNotice, getJoinGroupNotice} from "../../common/getJoinGroup";
import {EllipsisOutlined} from "@ant-design/icons";
import UserInfoModal from "../../person/personInfo";
import SocketInstance from "../../websocket/socketInstance";
import {ChatPageDrawer} from "./chatPageDrawer";

const { TextArea } = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [memberInfoVisible, setMemberInfoVisible] = useState(false);
	const [member, setMember] = useState({});

	const recordEnd = useRef(null);

	const { userInfo, activeChat, groupMap, chatRecordMap, userIdMap } = useSelector(state => state.user);
	const chatRecord = chatRecordMap[activeChat.key];

	if (chatRecord) {
		useEffect(() => {
			if (recordEnd && recordEnd.current) {
				recordEnd.current.scrollIntoView();
			}
		}, [chatRecord.records]);
	}

	const handleInfiniteOnLoad = () => {

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
		let msgType = activeChat.type === 0 ? messageType.C2CSendRequestMessage : messageType.C2GSendRequestMessage
		SocketInstance.send(msgType,{
			fromId: userInfo.userId,
			talkId: activeChat.key,
			content: v
		});
		setContent('')
	};

	const showTime = (timestamp, index) => {
		// 第一条 显示
		if (index === 0) {
			return true;
		}
		let curTime = new Date().getTime();
		// 5 分钟内不显示
		if (curTime - timestamp < 300000) {
			return false
		}
		let nextDate = chatRecord.records[index - 1].sendTime;
		return timestamp - nextDate > 3 * 60 * 1000;
	}

	const openDrawer = () => {
		setDrawerVisible(true)
	}

	return (
		<div style={{height: '100%', width: 'calc(100% - 330px)', backgroundColor: '#f3f3f3'}}>
			<div style={{borderBottom: 'solid 1px #e0e0e0', height: '64px', display: 'flex'}}>
				<div style={{ fontSize: '18px', paddingTop: '18px', paddingLeft: '24px', width: 'calc(100% - 54px)' }}>
					{chatRecord.talkName}
				</div>
				{chatRecord.talkType === 0 ? <div/> :
					<div style={{width: '54px', margin: 'auto'}}>
						<Button type="text" icon={<EllipsisOutlined style={{fontSize: '32px'}}/>} onClick={openDrawer}/>
					</div>
				}
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
								let isShowTime = showTime(record.sendTime, index);
								if (record.msgType === 2 || record.msgType === 3) {
									return (
										<div style={{ textAlign: 'center', color: 'rgba(153, 153, 153)'}}>
											<div style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '20px' }}>
												{getDateTime(record.sendTime, true)}
											</div>
											<div style={{ paddingBottom: '12px' }}>
												{chatRecord.talkType === 0 ?
													getCreateSingleNotice(chatRecord.talkName) :
													getJoinGroupNotice(groupMap[chatRecord.groupId].memberMap, userInfo.userId, record.fromId, record.content, userIdMap)
												}
											</div>
										</div>
									)
								}
								return (
									<List.Item key={record.msgId}
														 style={{ display: 'flex' }}
														 className={record.fromId === userInfo.userId ? 'keep-right' : 'keep-left'}>
										<div className='chatPageAvatar' style={{ paddingTop: (isShowTime ? '36px' : '0') }}>
											{ record.fromId === userInfo.userId ?
												getAvatar(userInfo.avatarUrl, 0, userInfo, 40) :
													chatRecord.talkType === 0 ?
													getAvatar(record.avatarUrl, 0, { account: chatRecord.account, ...record }, 40) :
													<div style={{ paddingTop: '8px' }}>
														{ groupMap[chatRecord.groupId] && getAvatar(record.avatarUrl, 0, { account: groupMap[chatRecord.groupId].memberMap[record.fromId].account, ...record}, 40)  }
													</div>
											}
										</div>
										<div className='chatPageContent' >
											{ !isShowTime ? <div/> :
												<div style={{ textAlign: 'center', paddingBottom: '14px', color: 'rgba(153, 153, 153)' }}>
													{getDateTime(record.sendTime, true)}
												</div>
											}
											<div className='titleOrMsg'>
												{ (parseInt(chatRecord.talkType) === 1 && record.fromId !== userInfo.userId )
													? <div style={{ paddingBottom: '4px' }}>{record.from}</div>
													: <div/>
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

			<ChatPageDrawer
				drawerVisible={drawerVisible}
				setDrawerVisible={setDrawerVisible}
				setMember={setMember}
				setMemberInfoVisible={setMemberInfoVisible}
			/>

			<UserInfoModal
				member={member}
				memberInfoVisible={memberInfoVisible}
				setMemberInfoVisible={setMemberInfoVisible}
				style={{ marginRight: '261px' }}
			/>
		</div>
	)
}