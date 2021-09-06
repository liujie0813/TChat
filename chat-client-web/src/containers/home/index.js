import React, {useEffect} from 'react'
import {Avatar, Layout, message, Tabs} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {
	setActiveContact,
	setActiveMenu,
	setContactList,
	setMenuImg,
	setPage,
	setUserInfo,
	setChatList,
	setActiveChat
} from "../../store/features/UserSlice";
import axios from "axios";
import ChatPage from "../../components/chatPage";

const { Content } = Layout;
const { TabPane } = Tabs;

export default function Home() {
	const {
		userInfo, chatMenuImg, activeMenu, contactMenuImg, activeContact, contactList,
		activeChat, chatList
	} = useSelector(state => state.user)
	const dispatch = useDispatch();

	useEffect(() => {
		async function getTalkList() {
			try {
				const params = {
					userId: userInfo.userId
				}
				const res = await axios.get('http://localhost:18080/chat/talkList', { params });
				const payload = res.data;
				if (payload.code === 0) {
					dispatch(setChatList([{talkId: -1}, ...payload.data]));
				} else {
					message.warn(payload.msg)
				}
			} catch (err) {
				message.error(err.message)
			}
		}
		getTalkList()
	}, [])

	useEffect(() => {
		async function getContactList() {
			try {
				const params = {
					userId: userInfo.userId
				}
				const res = await axios.get('http://localhost:18080/contact/getContactList', { params } );
				const payload = res.data;
				if (payload.code === 0) {
					dispatch(setContactList([{userId: -2}, ...payload.data]));
				} else {
					message.warn(payload.msg)
				}
			} catch (err) {
				message.error(err.message)
			}
		}
		getContactList();
	},[]);

	const tabClick = (key, event) => {
		dispatch(setActiveMenu(key))
		dispatch(setMenuImg(key))
		dispatch(setPage({}))
	}

	const chatTabClick = (key, event) => {
		dispatch(setActiveChat(key))
		dispatch(setPage({
			type: 'chatPage',
			data: key
		}))
	}

	const contactTabClick = (key, event) => {
		dispatch(setActiveContact(key))
		dispatch(setPage({
			type: 'contactInfoPage',
			data: key
		}))
	}

	const chatTabScroll = (direction) => {
		console.log(direction)
	}

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Tabs tabPosition='left' style={{ backgroundColor: '#e5e5e4', width: '370px' }}
						defaultActiveKey={activeMenu.key}
						onTabClick={ tabClick }>
				<TabPane tab={
						<div style={{ padding: '24px 12px 12px' }}>
							<Avatar size={48} src={img1} />
						</div>
					}
					disabled
					key="avator">
				</TabPane>

				<TabPane tab={
					<div style={{ padding: '6px 20px 20px' }}>
						<Avatar shape="square" size={30} src={chatMenuImg.img}/>
					</div>
				} key="chatMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						<SearchBox/>

						<Tabs tabPosition='left'
								defaultActiveKey={activeChat === null ? -1 : activeChat.key}
								onTabClick={ chatTabClick }
								style={{ height: 'calc(100vh - 40px)' }}>
							{chatList.map((chat, index) => {
								if (chat.talkId === -1) {
									return (
										<TabPane tab={
											<div style={{ height: 0}} />
										} key={-1}>
										</TabPane>
									)
								}
								return (
									<TabPane tab={
											<div style={{ width: '300px', height: '53px', padding: '6px 0 24px 0', borderBottom: 'solid 1px #e0e0e0' }}>
												{chat.talkName}
											</div>
										}
										key={chat.talkId}>
									</TabPane>
								)
							})}
						</Tabs>
					</div>
				</TabPane>

				<TabPane tab={
					<div style={{ padding: '6px 20px 20px' }}>
						<Avatar shape="square" size={30} src={contactMenuImg.img}/>
					</div>
				} key="contactMenu">

					<div style={{ height: '100%', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						<SearchBox/>

						<div style={{ height: 'auto' }}>
							<Tabs tabPosition='left'
										defaultActiveKey={activeContact === null ? -2 : activeContact.key}
										onTabClick={ contactTabClick }
										style={{ height: 'calc(100vh - 40px)' }}>
								{contactList.map((contact, index) => {
									if (contact.userId === -2) {
										return (
											<TabPane tab={
												<div style={{ height: 0}} />
											} key={-2}>
											</TabPane>
										)
									}
									return (
										<TabPane tab={
											<div style={{ width: '300px', padding: '6px 0 24px 0', borderBottom: 'solid 1px #e0e0e0' }}>
												{contact.username}
											</div>
										} key={contact.userId}>
										</TabPane>
									)
								})}
							</Tabs>
						</div>
					</div>
				</TabPane>

				<TabPane tab={
						<div style={{ padding: '20px 20px', paddingTop: 'calc(100vh - 300px)' }}>
							<Avatar shape="square" size={30} src={img6}/>
						</div>
					}
					disabled
					key="quitMenu">
				</TabPane>
			</Tabs>
			<ChatPage/>
		</div>
	)
}