import React from "react";
import {Button, message, Modal} from "antd";
import {useSelector} from "react-redux";
import {getAvatar} from "../common/avatar";
import {applyAddContact} from "../api/user";
import {toGetContactList} from "../api/userEncapsulation";

export default function UserInfoModal(props) {
	const {
		member, memberInfoVisible, setMemberInfoVisible,
		style
	} = props;

	const { userInfo, contactMap } = useSelector(state => state.user);

	const toAddUser = () => {
		let resp = applyAddContact(userInfo.userId, member.userId);
		resp.then(data => {
			if (data) {
				message.success("添加成功")
			} else {
				message.success("添加失败")
			}
			toGetContactList(userInfo.userId)
		})
	}

	if (!member) {
		return (
			<div/>
		)
	}
	return (
		<Modal visible={memberInfoVisible}
					 closable={false}
					 mask={false}
					 maskClosable={true}
					 footer={null}
					 onCancel={() => setMemberInfoVisible(false)}
					 width={400}
					 bodyStyle={{ padding: '48px' }}
					 style={ style }>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '30px', minWidth: '304px' }}>
				<div style={{ width: 'calc(100% - 80px)' }}>
					<div style={{ fontSize: '22px', fontWeight: '500' }}>{member.nickname}</div>
					<div style={{ paddingTop: '8px' }}>{member.signature ? member.signature : 'ta没有说什么'}</div>
				</div>
				<div style={{ width: '80px' }}>
					{ getAvatar(member.avatarUrl, 0, member, 80) }
				</div>
			</div>
			<div style={{ padding: '30px 0', minWidth: '304px' }}>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{member.account}</span>
				</div>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{member.sex == null ? '未知' : member.sex}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{(member.privince || member.city) ? member.province + ' ' + member.city : '未知'}</span>
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				{
					userInfo.account === member.account ? <div/> :
						contactMap[member.account] ?
							<Button type='primary' disabled>已添加</Button> :
							<Button type='primary' onClick={toAddUser}>添加</Button>
				}
			</div>
		</Modal>
	)
}
