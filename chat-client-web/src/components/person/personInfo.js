import React, {useEffect, useState} from "react";
import {Avatar, Modal} from "antd";
import {useSelector} from "react-redux";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {getColor} from "../../common/util/cssUtil";

export default function UserInfoModal(props) {
	const { userInfo } = useSelector(state => state.user);

	return (
		<Modal visible={props.visible}
					 closable={false}
					 mask={false}
					 maskClosable={true}
					 footer={null}
					 onCancel={() => props.toSetUserInfoVisible(false)}
					 width={400}
					 bodyStyle={{ padding: '48px' }}
					 style={{ marginTop: '-45px', marginLeft: '72px' }}>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '30px', minWidth: '304px' }}>
				<div style={{ width: 'calc(100% - 80px)' }}>
					<div style={{ fontSize: '22px', fontWeight: '500' }}>{userInfo.nickname}</div>
					<div style={{ paddingTop: '8px' }}>{userInfo.signature ? userInfo.signature : 'ta没有说什么'}</div>
				</div>
				<div style={{ width: '80px' }}>
					{ getAvatar(userInfo.avatarUrl, userInfo.account, userInfo.nickname, 80) }
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
					<span style={{ paddingLeft: '40px' }}>{(userInfo.privince || userInfo.city) ? userInfo.province + ' ' + userInfo.city : '未知'}</span>
				</div>
			</div>
		</Modal>
	)
}

export function getAvatar(avatarUrl, account, nickname, size) {
	if (avatarUrl) {
		return (
			<Avatar src={avatarUrl} size={size}/>
		)
	} else {
		let showName;
		if (nickname && isDigitOrLetter(nickname.substring(0, 6))) {
			showName = nickname.substring(0, 6);
		} else if (account) {
			showName = account.substring(0, 6);
		}
		let backgroundColor = getColor(account);
		let gap = parseInt(size / 10);
		return (
			<Avatar style={{ color: '#fff', backgroundColor }} size={size} gap={gap}>
				{showName}
			</Avatar>
		)
	}
}