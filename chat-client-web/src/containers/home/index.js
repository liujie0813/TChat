import React, {useState} from 'react'
import {Avatar, Badge, Tabs} from 'antd'
import './home.css'
import img6 from '../../common/images/quit.png';
import SearchBox from "../../components/searchOrAdd";
import {useDispatch, useSelector} from "react-redux";
import {logout, setChatData, setContactData, setMenuData,} from "../../store/features/userSlice";
import DataPage from "../../components/dataPage";
import UserInfoModal from "../../components/person/personInfo";
import {useHistory} from "react-router-dom";
import {getAvatar} from "../../components/common/avatar";
import SocketInstance from "../../components/websocket/socketInstance";
import {ChatMenuPage} from "../../components/menuPage/chatMenuPage";
import {ContactMenuPage} from "../../components/menuPage/contactMenuPage";

const { TabPane } = Tabs;

export const applyStatusMap = {
	0: '添加',
	1: '已申请',
	2: '已添加',
	3: '已过期'
}

export default function Home() {
	const history = useHistory();
	const {
		userInfo,
		activeMenu, chatMenuImg, contactMenuImg,
		activeChat, activeContact,
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
			console.log('[ quit ] logout')
			SocketInstance.close()
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

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<Tabs tabPosition='left' style={{ backgroundColor: '#e5e5e4', width: '371px', minWidth: '371px' }}
						activeKey={activeMenu}
						onTabClick={ tabClick }>
				{/* 头像 */}
				<TabPane tab={
						<div style={{ padding: '20px 12px 12px' }}>
							{ getAvatar(userInfo.avatarUrl, 0, userInfo, 48) }
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

						<ChatMenuPage/>
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
						<ContactMenuPage/>
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
				userInfo={userInfo}
				style={{ marginTop: '-45px', marginLeft: '72px' }}
				visible={userInfoVisible}
				toSetUserInfoVisible={setUserInfoVisible}
			/>
		</div>
	)
}