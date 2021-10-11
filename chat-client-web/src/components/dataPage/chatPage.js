import {Avatar, Image, List, message, Spin, Tooltip, Input, Button, Drawer} from "antd";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import img2 from "../../common/images/emoji.svg";
import React, {useEffect, useRef, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import WebSocketInstance from '../websocket/webSocketInstance'
import {useSelector} from "react-redux";
import {getAvatar} from "../common/avatar";
import {formatDate, getDateTime} from "../common/time";
import {messageType} from "../websocket/messageType";
import {getJoinGroup, getJoinGroupNotice} from "../common/getJoinGroup";
import {EllipsisOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import UserInfoModal from "../person/personInfo";

const { TextArea } = Input;

export default function ChatPage() {
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const [memberInfoVisible, setMemberInfoVisible] = useState(false);
	const [member, setMember] = useState({});

	const recordEnd = useRef(null);

	const { userInfo, activeChat, chatRecordList, groupMap, chatRecordMap, userIdMap } = useSelector(state => state.user);
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
		WebSocketInstance.sendMsg(msgType,{
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

	const memberClick = (member) => {
		setMember(member);
		setMemberInfoVisible(true)
	}

	const onSearchMember = () => {

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
								let isShowTime = showTime(record.sendTime, index)
								if (record.msgType === 2) {
									return (
										<div style={{ textAlign: 'center', color: 'rgba(153, 153, 153)'}}>
											{ <div style={{ textAlign: 'center', paddingTop: '12px', paddingBottom: '24px' }}>
													{getDateTime(record.sendTime, true)}
												</div>
											}
											{ getJoinGroupNotice(groupMap[chatRecord.groupId].memberMap, userInfo.userId, record.fromId, record.content, userIdMap) }
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
												getAvatar(chatRecord.avatarUrl, 0, chatRecord, 40) }
										</div>
										<div className='chatPageContent' >
											{ !isShowTime ? <div/> :
												<div style={{ textAlign: 'center', paddingBottom: '14px', color: 'rgba(153, 153, 153)' }}>
													{getDateTime(record.sendTime, true)}
												</div>
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

			<Drawer className='chatPageDrawer'
							closable={false}
							width={260}
							maskStyle={{ backgroundColor: 'transparent'}}
							placement="right"
							style={{ marginTop: '63px' }}
							drawerStyle={{ border: '1px solid #e0e0e0', backgroundColor: '#fff' }}
							// bodyStyle={{ backgroundColor: '#fff' }}
							onClose={() => setDrawerVisible(false)}
							visible={drawerVisible}>
				<div style={{ color: 'rgba(153, 153, 153)', fontSize: '12px' }}>
					群组名称
				</div>
				<div style={{ margin: '4px 0 14px' }}>
					{ groupMap[chatRecord.groupId] && groupMap[chatRecord.groupId].groupName }
				</div>
				<div style={{ color: 'rgba(153, 153, 153)', fontSize: '12px' }}>
					备注
				</div>
				<div style={{ margin: '4px 0 24px' }}>
					{ groupMap[chatRecord.groupId] && (groupMap[chatRecord.groupId].groupNameRemark ? groupMap[chatRecord.groupId].groupNameRemark : '无')  }
				</div>
				<Search placeholder="搜索群成员" allowClear onSearch={ onSearchMember }
								style={{ marginLeft: '-2px', marginBottom: '10px', width: '222px' }}/>
				<div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 202px)' }}>
					<InfiniteScroll
						pageStart={0}
						loadMore={() => {}}
						hasMore={false}
						loader={ <div/> }
						useWindow={false}
						className='singleContactList'>
						{/* 循环遍历 */}
						<List
							dataSource={ groupMap[chatRecord.groupId] ? groupMap[chatRecord.groupId].members : [] }
							renderItem={ member => (
								<List.Item key={member.account}>
									<Button type='text' style={{ height: '56px' }} onClick={() => memberClick(member)}>
										<div style={{ textAlign: 'left'}}>
											{ member &&
											getAvatar(member.avatarUrl, 0, member, 36)}
											<div style={{ display: 'inline-block', marginLeft: '12px' }}>
												{ member.nicknameRemark ? member.nicknameRemark : member.nickname }
											</div>
										</div>
									</Button>
								</List.Item>
							)}>
						</List>
					</InfiniteScroll>
				</div>
			</Drawer>

			<UserInfoModal
				userInfo={member}
				visible={memberInfoVisible}
				toSetUserInfoVisible={setMemberInfoVisible}
				style={{ }}
			/>
		</div>
	)
}