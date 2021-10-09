import React, {useEffect, useState} from 'react'
import {Avatar, Tabs, Collapse, List, Spin, Button, Badge} from 'antd'
import './home.css'
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/searchOrAdd";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import {logout, setChatData, setContactData, setMenuData,} from "../../store/features/userSlice";
import DataPage from "../../components/dataPage";
import UserInfoModal from "../../components/person/personInfo";
import {useHistory} from "react-router-dom";
import {getAvatar} from "../../components/common/avatar";
import {getDateTime} from "../../components/common/time";
import WebSocketInstance from "../../components/websocket/webSocketInstance";
import {updateUnreadNum} from "../../components/api/user";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Home() {
	const history = useHistory();
	const {
		userInfo,
		activeMenu, chatMenuImg, contactMenuImg,
		activeChat, chatList, activeContact, contactList, groupList,
		chatRecordList, chatRecordMap,
		totalUnreadNum
	} = useSelector(state => state.user);
	const [userInfoVisible, setUserInfoVisible] = useState(false);
	const dispatch = useDispatch();

	const tabClick = (key, event) => {
		if (key === 'avatar') {
			setUserInfoVisible(true);
			return
		}
		if (key === 'quitMenu') {
			WebSocketInstance.closeWebSocket();
			dispatch(logout());
			history.push('/');
			return;
		}
		dispatch(setMenuData(key));
		if (key === 'chatMenu' && activeChat != null) {
			dispatch(setChatData(activeChat))
		} else if (key === 'contactMenu' && activeContact != null) {
			dispatch(setContactData(activeContact))
		}
	};

	const chatTabClick = (key, event) => {
		dispatch(setChatData(key));
		updateUnreadNum(userInfo.userId, chatRecordMap[key].talkId);
	};

	const contactTabClick = (key) => {
		dispatch(setContactData(key))
	};

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Tabs tabPosition='left' style={{ backgroundColor: '#e5e5e4', width: '371px', minWidth: '371px' }}
						activeKey={activeMenu}
						onTabClick={ tabClick }>
				{/* 头像 */}
				<TabPane tab={
						<div style={{ padding: '20px 12px 12px' }}>
							{ getAvatar(userInfo.avatarUrl, userInfo.account, userInfo.nickname, 48) }
						</div>
					}
					key="avatar">
				</TabPane>

				{/* 聊天菜单 */}
				<TabPane tab={
						<div style={{ padding: '22px' }}>
							<Badge count={totalUnreadNum} size='small'>
								<Avatar shape="square" size={28} src={chatMenuImg.img}/>
							</Badge>
						</div>
					} key="chatMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						{/* 搜索框 */}
						<SearchBox/>

						<div style={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}>
							<InfiniteScroll
								pageStart={0}
								loadMore={() => {}}
								hasMore={false}
								loader={ <div/> }
								useWindow={false}
								className='singleContactList'>
								{/* 循环遍历 */}
								<List
									dataSource={ chatRecordList }
									renderItem={ chatRecord => {
										let recordLen = chatRecord.records.length
										return (
											<List.Item key={chatRecord.account} className={ chatRecord.talkId === activeChat ? 'contactActive' : ''}>
												<Button type='link' style={{ height: '72px' }}
																onClick={() => chatTabClick(chatRecord.talkId)}>
													<div style={{ width: '300px', height: '70px', padding: '0 16px', textAlign: 'left', display: 'flex' }}>
														<div style={{ padding: '15px 0'}}>
															<Badge count={chatRecord.unreadNum} size='small' offset={[-3, 3]}>
																{ getAvatar(chatRecord.avatarUrl, chatRecord.account, chatRecord.talkName, 40) }
															</Badge>
														</div>
														<div style={{ marginLeft: '10px', padding: '10px 0' }}>
															<div style={{ width: '156px', color: '#000' }}>
																{ chatRecord.talkName }
															</div>
															<div style={{ fontSize: '12px', paddingTop: '6px', color: 'rgba(153, 153, 153)', maxWidth: '156px' }}
																	className='overWidth'>
																{ recordLen > 0 && chatRecord.records[recordLen - 1].content }
															</div>
														</div>
														<div style={{ width: '60px', textAlign: 'right', fontSize: '10px', paddingTop: '12px', color: 'rgba(153, 153, 153)' }}>
															{ recordLen > 0 && getDateTime(chatRecord.records[recordLen - 1].sendTime, false) }
														</div>
													</div>
												</Button>
											</List.Item>
										)
									}}>
								</List>
							</InfiniteScroll>
						</div>
					</div>
				</TabPane>

				{/* 联系人菜单 */}
				<TabPane tab={
					<div style={{ padding: '22px' }}>
						<Avatar shape="square" size={28} src={contactMenuImg.img}/>
					</div>
				} key="contactMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }} className='contactList'>
						<SearchBox/>

						{/* 联系人列表 */}
						<Collapse accordion className='secondList'>
							<Panel header='新的联系人' key='newContactList'>
								<div style={{ overflow: 'auto', height: 'calc(100vh - 202px)' }}>
									无
								</div>
							</Panel>
							<Panel header='群组' key='groupList'>
								<div style={{ overflow: 'auto', height: 'calc(100vh - 202px)' }}>
									<InfiniteScroll
										pageStart={0}
										loadMore={() => {}}
										hasMore={false}
										loader={ <div/> }
										useWindow={false}
										className='singleContactList'>
										{/* 循环遍历 */}
										<List
											dataSource={ contactList }
											renderItem={ contact => (
												<List.Item key={contact.account} className={ contact.account === activeContact ? 'contactActive' : ''}>
													<Button type='link' style={{ height: '68px' }}
																	onClick={() => contactTabClick(contact.account)}>
														<div style={{ width: '252px', margin: '0 12px 0 36px', textAlign: 'left'}}>
															{ contact &&
															getAvatar(contact.avatarUrl, contact.account, contact.nickname, 40)}
															<div style={{ display: 'inline-block', marginLeft: '12px' }}>
																{ contact.nicknameRemark ? contact.nicknameRemark : contact.nickname }
															</div>
														</div>
													</Button>
												</List.Item>
											)}>
										</List>
									</InfiniteScroll>
								</div>
							</Panel>
							<Panel header='联系人' key='contactList'>
								<div style={{ overflow: 'auto', height: 'calc(100vh - 202px)' }}>
									<InfiniteScroll
											pageStart={0}
											loadMore={() => {}}
											hasMore={false}
											loader={ <div/> }
											useWindow={false}
											className='singleContactList'>
										{/* 循环遍历 */}
										<List
											dataSource={ contactList }
											renderItem={ contact => (
												<List.Item key={contact.account} className={ contact.account === activeContact ? 'contactActive' : ''}>
													<Button type='link' style={{ height: '68px' }}
																	onClick={() => contactTabClick(contact.account)}>
														<div style={{ width: '252px', margin: '0 12px 0 36px', textAlign: 'left'}}>
															{ contact &&
																getAvatar(contact.avatarUrl, contact.account, contact.nickname, 40)}
															<div style={{ display: 'inline-block', marginLeft: '12px' }}>
																{ contact.nicknameRemark ? contact.nicknameRemark : contact.nickname }
															</div>
														</div>
													</Button>
												</List.Item>
											)}>
										</List>
									</InfiniteScroll>
								</div>
							</Panel>
						</Collapse>
					</div>
				</TabPane>

				{/* 退出 */}
				<TabPane tab={
						<div style={{ padding: '22px 22px 22px 26px' }}>
							<Avatar shape="square" size={24} src={img6}/>
						</div>
					}
					key="quitMenu">
				</TabPane>
			</Tabs>
			<DataPage/>
			<UserInfoModal
				visible={userInfoVisible}
				toSetUserInfoVisible={setUserInfoVisible}
			/>
		</div>
	)
}