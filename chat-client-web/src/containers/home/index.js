import React, {useEffect} from 'react'
import {Avatar, Layout, message, Tabs} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {
	setUserInfo,
	setChatList,
	setContactList,
	setMenuData,
	setChatData,
	setContactData,
} from "../../store/features/UserSlice";
import axios from "axios";
import ChatPage from "../../components/chatPage";

const { Content } = Layout;
const { TabPane } = Tabs;

export default function Home() {
	const {
		userInfo,
		activeMenu, chatMenuImg, contactMenuImg,
		activeChat, chatList, activeContact, contactList
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
		dispatch(setMenuData(key));
		if (key === 'chatMenu' && activeChat != null) {
			dispatch(setChatData(activeChat))
		} else if (key === 'contactMenu' && activeContact != null) {
			dispatch(setContactData(activeContact))
		}
	};

	const chatTabClick = (key, event) => {
		dispatch(setChatData(key))
	};

	const contactTabClick = (key, event) => {
		dispatch(setContactData(key))
	};

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Tabs tabPosition='left' style={{ backgroundColor: '#e5e5e4', width: '330px' }}
						defaultActiveKey={activeMenu}
						onTabClick={ tabClick }>
				<TabPane tab={
						<div style={{ padding: '20px 10px 10px' }}>
							<Avatar size={40} src={img1} />
						</div>
					}
					disabled
					key="avator">
				</TabPane>

				<TabPane tab={
					<div style={{ padding: '2px 18px 18px' }}>
						<Avatar shape="square" size={24} src={chatMenuImg.img}/>
					</div>
				} key="chatMenu">

						<div style={{ width: '270px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
							<SearchBox/>

							<Tabs tabPosition='left'
									defaultActiveKey={activeChat === null ? -1 : activeChat}
									onTabClick={ chatTabClick }
									style={{ height: 'calc(100vh - 20px)' }}>
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
												<div style={{ width: '270px', height: '48px', padding: '4px 0 26px 0', borderBottom: 'solid 1px #e0e0e0' }}>
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
					<div style={{ padding: '2px 18px 18px' }}>
						<Avatar shape="square" size={24} src={contactMenuImg.img}/>
					</div>
				} key="contactMenu">

					<div style={{ height: '100%', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						<SearchBox/>

						<div style={{ height: 'auto' }}>
							<Tabs tabPosition='left'
										defaultActiveKey={activeContact === null ? -2 : activeContact}
										onTabClick={ contactTabClick }
										style={{ height: 'calc(100vh - 30px)' }}>
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
						<div style={{ padding: '2px 18px 16px 20px' }}>
							<Avatar shape="square" size={22} src={img6}/>
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