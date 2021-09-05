import React, {useEffect} from 'react'
import {Avatar, Layout, message, Tabs} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {setActiveContact, setActiveMenu, setContactList, setMenuImg, setPage} from "../../store/features/UserSlice";
import axios from "axios";
import ChatPage from "../../components/chatPage";

const { Content } = Layout;
const { TabPane } = Tabs;

export default function Home() {
	const { userInfo, chatMenuImg, activeMenu, contactMenuImg, activeContact, contactList  } = useSelector(state => state.user)
	const dispatch = useDispatch();

	useEffect(() => {
		async function getContactList() {
			try {
				const params = {
					userId: userInfo.userId
				}
				const res = await axios.get('http://localhost:18080/contact/getContactList', { params } );
				const payload = res.data;
				if (payload.code === 0) {
					dispatch(setContactList([{userId: 0}, ...payload.data]));
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
	}

	const contactTabClick = (key, event) => {
		dispatch(setActiveContact(key))
		dispatch(setPage({
			type: 'contactInfoPage',
			data: key
		}))
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<Content className='P-background'>
				<div style={{ margin: '5% 15%', height: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)', display: 'flex', minWidth: '810px' }}>
					<Tabs tabPosition='left' style={{ height: '100%', backgroundColor: '#e5e5e4', width: '330px', flexShrink: '0' }}
					      defaultActiveKey={activeMenu.key}
					      onTabClick={ tabClick }>
							<TabPane tab={
									<div style={{ padding: '10px' }}>
										<Avatar size={40} src={img1} />
									</div>
								}
							  disabled
							  key="avator">
							</TabPane>

							<TabPane tab={
								<div style={{ padding: '18px' }}>
									<Avatar shape="square" size={24} src={chatMenuImg.img}/>
								</div>
							} key="chatMenu">
								<div style={{ height: '100%', width: '270px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
									<SearchBox/>
									<div style={{ height: 'auto', padding: '5px' }}>Content of Tab 1</div>
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
										      defaultActiveKey={activeContact === null ? 0 : activeContact.key}
										      onTabClick={ contactTabClick }>
											{contactList.map((contact, index) => {
												if (contact.userId === 0) {
													return (
														<TabPane tab={
															<div style={{ height: 0}} />
														} key={0}>
														</TabPane>
													)
												}
												return (
													<TabPane tab={
														<div style={{ width: '270px', padding: '4px 0 20px 0', borderBottom: 'solid 1px #e0e0e0' }}>
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
									<div style={{ padding: '2px 18px 18px' }}>
										<Avatar shape="square" size={24} src={img6}/>
									</div>
								}
							  disabled
							  key="quitMenu">
							</TabPane>
						</Tabs>
					<ChatPage/>
				</div>
			</Content>
		</Layout>
	)
}