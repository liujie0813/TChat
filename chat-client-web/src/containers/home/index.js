import React, {useEffect, useState} from 'react'
import {Avatar, Layout, message, Tabs} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/search";
import {useDispatch, useSelector} from "react-redux";
import {setMenuImg, setContactList, setActiveMenu} from "../../store/features/UserSlice";
import axios from "axios";

const { Content } = Layout;
const { TabPane } = Tabs;

export default function Home() {
	const { userInfo, chatMenuImg, activeMenu, contactMenuImg, contactList  } = useSelector(state => state.user)
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
					dispatch(setContactList(payload.data));
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

	return (
		<Layout style={{ height: '100vh' }}>
			<Content className='P-background'>
				<div style={{ margin: '5% 15%', height: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
					<div style={{ height: '100%', }}>
						<Tabs tabPosition='left' style={{ height: '100%', backgroundColor: '#e5e5e4', float: 'left' }}
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
								<div style={{ height: '100%', width: '270px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0' }}>
									<SearchBox/>
									<div style={{ height: 'auto' }}>
										<Tabs tabPosition='left'>
											{contactList.map((contact, index) => {
												return (
													<TabPane tab={
														<div style={{ width: '270px', padding: (index === 0 ? '20' : '4') + 'px 0 20px 0', borderBottom: 'solid 1px #e0e0e0' }}>
															{contact.username}
														</div>
													} key={contact.userId}>
														{contact.username}
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

						<div style={{ height: '100%', width: 'auto', backgroundColor: '#f3f3f3' }}>
							<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '60px' }}>
								<div>会话名</div>
							</div>

							<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '70%' }}>
								<div>聊天记录区</div>
							</div>

							<div style={{ height: 'auto' }}>
								<div>输入区</div>
							</div>
						</div>
					</div>
				</div>
			</Content>
		</Layout>
	)
}