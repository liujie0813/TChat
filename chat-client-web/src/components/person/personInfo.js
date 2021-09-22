import React from "react";
import {Avatar, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setShowUserInfo} from "../../store/features/UserSlice";

export default function UserInfoModal() {
	const {
		userInfo, userInfoVisible
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const cancelShowUserInfo = () => {
		dispatch(setShowUserInfo(false))
	}

	return (
		<Modal visible={userInfoVisible}
					 closable={false}
					 mask={false}
					 maskClosable={true}
					 footer={null}
					 onCancel={cancelShowUserInfo}
					 width={400}
					 bodyStyle={{ padding: '48px' }}
					 style={{ marginTop: '-45px', marginLeft: '72px' }}>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '30px', minWidth: '304px' }}>
				<div style={{ width: 'calc(100% - 80px)' }}>
					<div style={{ fontSize: '22px', fontWeight: '500' }}>{userInfo.username}</div>
					<div style={{ paddingTop: '8px' }}>{userInfo.signature}</div>
				</div>
				<div style={{ width: '80px' }}>
					<Avatar src={userInfo.avatarUrl} size={80}/>
				</div>
			</div>
			<div style={{ padding: '30px 0', minWidth: '304px' }}>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.account}</span>
				</div>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.sex}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.province} {userInfo.city}</span>
				</div>
			</div>
		</Modal>
	)
}