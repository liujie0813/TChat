import React, {useEffect, useState} from 'react'
import {Avatar, Tabs, Collapse} from 'antd'
import './home.css'
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/searchOrAdd";
import {useDispatch, useSelector} from "react-redux";
import {logout, setChatData, setContactData, setMenuData,} from "../../store/features/userSlice";
import DataPage from "../../components/dataPage";
import UserInfoModal from "../../components/person/personInfo";
import {useHistory} from "react-router-dom";
import {getAvatar} from "../../components/common/avatar";
import {getDateTime} from "../../components/common/time";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Home() {
	const history = useHistory();
	const {
		userInfo,
		activeMenu, chatMenuImg, contactMenuImg,
		activeChat, chatList, activeContact, contactList,
		chatRecords
	} = useSelector(state => state.user);
	const [userInfoVisible, setUserInfoVisible] = useState(false);
	const dispatch = useDispatch();

	const tabClick = (key, event) => {
		if (key === 'avatar') {
			setUserInfoVisible(true)
			return
		}
		if (key === 'quitMenu') {
			dispatch(logout())
			history.push('/')
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
		dispatch(setChatData(key))
	};

	const contactTabClick = (key, event) => {
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
							<Avatar shape="square" size={28} src={chatMenuImg.img}/>
						</div>
					} key="chatMenu">

					<div style={{ width: '300px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
						{/* 搜索框 */}
						<SearchBox/>

						{/* 聊天列表 */}
						<Tabs tabPosition='left'
								activeKey={activeChat === null ? -1 : activeChat}
								onTabClick={ chatTabClick }
								style={{ height: 'calc(100vh - 20px)' }}
								className='secondList'>

							{/* 循环遍历 */}
							{Object.keys(chatRecords).map((key) => {
								let chatRecord = chatRecords[key];
								return (
									<TabPane tab={
											<div style={{ width: '300px', height: '68px', padding: '0 16px', textAlign: 'left', display: 'flex' }}>
												<div style={{ padding: '14px 0' }}>
													{ getAvatar(chatRecord.avatarUrl, chatRecord.account, chatRecord.talkName, 40) }
												</div>
												<div style={{ marginLeft: '10px', padding: '10px 0' }}>
													<div style={{ width: '156px', color: '#000' }}>
														{ chatRecord.talkName }
													</div>
													<div style={{ fontSize: '12px', paddingTop: '6px', color: 'rgba(153, 153, 153)' }}>
														{ chatRecord.records[0] && chatRecord.records[0].content }
													</div>
												</div>
												<div style={{ width: '60px', textAlign: 'right', fontSize: '10px', paddingTop: '12px', color: 'rgba(153, 153, 153)' }}>
													{ chatRecord.records[0] && getDateTime(chatRecord.records[0].sendTime, false) }
												</div>
											</div>
										}
										key={chatRecord.talkId}>
									</TabPane>
								)
							})}
						</Tabs>
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
						<Collapse className='secondList'>
							<Panel header='新的联系人' key='newContactList'>
								<div style={{ padding: '0 40px 6px 40px'}}>
									无
								</div>
							</Panel>
							<Panel header='群组' key='groupList'>
								<div style={{ padding: '0 40px 6px 40px'}}>
									无
								</div>
							</Panel>
							<Panel header='联系人' key='contactList'>
								<Tabs tabPosition='left'
											activeKey={activeContact === null ? -2 : activeContact}
											onTabClick={ contactTabClick }
											style={{ height: 'calc(100vh - 20px)' }}>
									{/* 循环遍历 */}
									{contactList.map((contact, index) => {
										return (
											<TabPane tab={
												<div style={{ width: '252px', height: '68px', margin: '0 12px 0 36px', padding: '14px 0', textAlign: 'left' }}>
													{ contact && getAvatar(contact.avatarUrl, contact.account, contact.nickname, 40) }
													<div style={{ display: 'inline-block', marginLeft: '12px' }}>
														{ contact.nicknameRemark ? contact.nicknameRemark : contact.nickname }
													</div>
												</div>
											} key={contact.userId}>
											</TabPane>
										)
									})}
								</Tabs>
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