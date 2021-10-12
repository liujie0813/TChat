import React from "react";
import {Button, message, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAvatar} from "../common/avatar";
import {addContact, getContactList} from "../api/user";
import {setContactList} from "../../store/features/userSlice";
import {toGetContactList} from "../api/userEncapsulation";

export default function UserInfoModal(props) {
	const { userInfo, contactMap } = useSelector(state => state.user);

	let personInfo = props.userInfo;

	const toAddUser = () => {
		let resp = addContact(userInfo.userId, personInfo.userId);
		resp.then(data => {
			if (data) {
				message.success("添加成功")
			} else {
				message.success("添加失败")
			}
			toGetContactList(userInfo.userId)
		})
	}

	return (
		<Modal visible={props.visible}
					 closable={false}
					 mask={false}
					 maskClosable={true}
					 footer={null}
					 onCancel={() => props.toSetUserInfoVisible(false)}
					 width={400}
					 bodyStyle={{ padding: '48px' }}
					 style={ props.style }>
			<div style={{ borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '30px', minWidth: '304px' }}>
				<div style={{ width: 'calc(100% - 80px)' }}>
					<div style={{ fontSize: '22px', fontWeight: '500' }}>{personInfo.nickname}</div>
					<div style={{ paddingTop: '8px' }}>{personInfo.signature ? personInfo.signature : 'ta没有说什么'}</div>
				</div>
				<div style={{ width: '80px' }}>
					{ getAvatar(personInfo.avatarUrl, 0, personInfo, 80) }
				</div>
			</div>
			<div style={{ padding: '30px 0', minWidth: '304px' }}>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>账 号</span>
					<span style={{ paddingLeft: '40px' }}>{personInfo.account}</span>
				</div>
				<div style={{ paddingBottom: '12px' }}>
					<span style={{ color: '#b0b0b0' }}>性 别</span>
					<span style={{ paddingLeft: '40px' }}>{personInfo.sex == null ? '未知' : personInfo.sex}</span>
				</div>
				<div>
					<span style={{ color: '#b0b0b0' }}>地 区</span>
					<span style={{ paddingLeft: '40px' }}>{(personInfo.privince || personInfo.city) ? personInfo.province + ' ' + personInfo.city : '未知'}</span>
				</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				{
					userInfo.account === personInfo.account ? <div/> :
						contactMap[personInfo.account] ?
							<Button type='primary' disabled>已添加</Button> :
							<Button type='primary' onClick={toAddUser}>添加</Button>
				}
			</div>
		</Modal>
	)
}
