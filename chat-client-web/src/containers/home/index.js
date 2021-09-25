import React from 'react'
import {Avatar, Layout, Tabs} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {setChatData, setContactData, setMenuData, setShowUserInfo,} from "../../store/features/userSlice";
import DataPage from "../../components/dataPage";
import UserInfoModal, {getAvatar} from "../../components/person/personInfo";

const { TabPane } = Tabs;

export default function Home() {
	const {
		userInfo,
		activeMenu, chatMenuImg, contactMenuImg,
		activeChat, chatList, activeContact, contactList
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const tabClick = (key, event) => {
		console.log("tabClick key: ", key);
		if (key === 'avatar') {
			dispatch(setShowUserInfo(true))
			return
		}

		dispatch(setMenuData(key));
		if (key === 'chatMenu' && activeChat != null) {
			dispatch(setChatData(activeChat))
		} else if (key === 'contactMenu' && activeContact != null) {
			dispatch(setContactData(activeContact))
		}
	};

	const chatTabClick = (key, event) => {
		console.log("chatTabClick key: ", key);
		dispatch(setChatData(key))
	};

	const contactTabClick = (key, event) => {
		console.log("contactTabClick key: ", key);
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
							{ getAvatar(userInfo, 48) }
						</div>
					}
					key="avatar">
				</TabPane>

				{/* 聊天菜单 */}
				<TabPane tab={
					<div style={{ padding: '6px 22px 22px' }}>
						<Avatar shape="square" size={28} src={chatMenuImg.img}/>
					</div>
				} key="chatMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						{/* 搜索框 */}
						<SearchBox/>

						{/* 聊天列表 */}
						<Tabs tabPosition='left'
								defaultActiveKey={activeChat === null ? -1 : activeChat}
								onTabClick={ chatTabClick }
								style={{ height: 'calc(100vh - 20px)' }}>

							{/* 循环遍历 */}
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
											<div style={{ width: '300px', height: '48px', padding: '4px 0 26px 0', borderBottom: 'solid 1px #e0e0e0' }}>
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

				{/* 联系人菜单 */}
				<TabPane tab={
					<div style={{ padding: '6px 22px 22px' }}>
						<Avatar shape="square" size={28} src={contactMenuImg.img}/>
					</div>
				} key="contactMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						<SearchBox/>

						{/* 联系人列表 */}
						<Tabs tabPosition='left'
									defaultActiveKey={activeContact === null ? -2 : activeContact}
									onTabClick={ contactTabClick }
									style={{ height: 'calc(100vh - 20px)' }}>
							{/* 循环遍历 */}
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
										<div style={{ width: '300px', height: '48px', padding: '4px 0 26px 0', borderBottom: 'solid 1px #e0e0e0' }}>
											{contact.username}
										</div>
									} key={contact.userId}>
									</TabPane>
								)
							})}
						</Tabs>
					</div>
				</TabPane>

				{/* 退出 */}
				<TabPane tab={
						<div style={{ padding: '6px 22px 18px 26px' }}>
							<Avatar shape="square" size={24} src={img6}/>
						</div>
					}
					disabled
					key="quitMenu">
				</TabPane>
			</Tabs>
			<DataPage/>
			<UserInfoModal/>
		</div>
	)
}