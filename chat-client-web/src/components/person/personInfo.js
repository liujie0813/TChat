import React from "react";
import {Avatar, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setShowUserInfo} from "../../store/features/userSlice";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {getColor} from "../../common/util/cssUtil";

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
					<div style={{ fontSize: '22px', fontWeight: '500' }}>{userInfo.nickname}</div>
					<div style={{ paddingTop: '8px' }}>{userInfo.signature}</div>
				</div>
				<div style={{ width: '80px' }}>
					{ getAvatar(userInfo, 80, null) }
				</div>
			</div>
			<div style={{ padding: '30px 0', minWidth: '304px' }}>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.account}</span>
				</div>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.sex == null ? '未知' : userInfo.sex}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{userInfo.province} {userInfo.city}</span>
				</div>
			</div>
		</Modal>
	)
}

export function getAvatar(userInfoParam, size, border) {
	if (userInfoParam.avatarUrl) {
		return (
			<Avatar src={userInfoParam.avatarUrl} size={size}/>
		)
	} else {
		let showName;
		if (userInfoParam.nickname && isDigitOrLetter(userInfoParam.nickname.charAt(0))) {
			showName = userInfoParam.nickname.charAt(0);
		} else {
			showName = userInfoParam.account.charAt(0);
		}
		let backgroundColor = getColor(userInfoParam.account.charAt(0));
		return (
			<Avatar style={{ color: '#fff', backgroundColor, border }} size={size}>
				<span style={{ fontSize: size/2.4 }}>{showName}</span>
			</Avatar>
		)
	}
}