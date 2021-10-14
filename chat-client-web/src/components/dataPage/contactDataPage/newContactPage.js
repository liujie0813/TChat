import {getAvatar} from "../../common/avatar";
import {Button, Input, Modal} from "antd";
import React, {useState} from "react";
import {agreeAddContact} from "../../api/user";
import {toGetApplyList, toGetContactList, toGetTalkList} from "../../api/userEncapsulation";
import {useDispatch, useSelector} from "react-redux";
import {setContactData, setOrUpdateSingleChatData} from "../../../store/features/userSlice";

export default function NewContactPage() {
	const [agreeVisible, setAgreeVisible] = useState(false);
	const [nicknameRemark, setNicknameRemark] = useState(null);

	const { userInfo, activeContact, page } = useSelector(state => state.user);
	const data = page.data;
	const dispatch = useDispatch();

	const toAgreeAddContact = () => {
		let resp = agreeAddContact(userInfo.userId, data.applyUserId, nicknameRemark);
		resp.then(data => {
			setAgreeVisible(false)
			toGetApplyList(userInfo.userId, activeContact)
			toGetContactList(userInfo.userId)
			toGetTalkList(userInfo.userId)
		})
	}

	const jumpChatPage = () => {
		dispatch(setOrUpdateSingleChatData({
			talkId: data.talkId,
			account: data.account
		}))
	}

	return (
		<div style={{ padding: '120px 300px 0 120px', width: 'calc(100% - 330px)', maxWidth: '1200px', display: 'flex', flexDirection: 'column' }}>
			<div style={{borderBottom: 'solid 1px #d0d0d0', display: 'flex', paddingBottom: '40px', minWidth: '420px'}}>
				<div style={{width: 'calc(100% - 120px)', minWidth: '300px'}}>
					<div style={{fontSize: '24px', fontWeight: '500'}}>{data.nickname}</div>
					<div style={{paddingTop: '8px'}}>{data.signature ? data.signature : 'ta没有说什么'}</div>
				</div>
				<div style={{width: '120px'}}>
					{getAvatar(data.avatar, 0, data, 108)}
				</div>
			</div>
			<div style={{borderBottom: 'solid 1px #d0d0d0', padding: '40px 0', minWidth: '420px'}}>
				<div style={{paddingBottom: '10px'}}>
					<span style={{color: '#b0b0b0'}}>账 号</span>
					<span style={{paddingLeft: '40px'}}>{data.account}</span>
				</div>
				<div style={{paddingBottom: '10px'}}>
					<span style={{color: '#b0b0b0'}}>性 别</span>
					<span style={{paddingLeft: '40px'}}>{data.gender ? data.gender : '未知'}</span>
				</div>
				<div>
					<span style={{color: '#b0b0b0'}}>地 区</span>
					<span
						style={{paddingLeft: '40px'}}>{(data.privince || data.city) ? data.province + ' ' + data.city : '未知'}</span>
				</div>
				{
					data.applyRemark ?
						<div>
							<span style={{color: '#b0b0b0'}}>申请备注</span>
							<span
								style={{paddingLeft: '40px'}}>{ data.applyRemark }</span>
						</div>
						:
						<div/>
				}
			</div>
			<div style={{paddingTop: '40px', paddingLeft: 'calc((100% - 120px) / 2)'}}>
				{
					data.applyStatus === 1 ?
						<Button type='primary' style={{width: '120px'}} onClick={() => setAgreeVisible(true)}>
							同意
						</Button>
						:
						<Button type='primary' style={{width: '120px'}} onClick={() => jumpChatPage(0)}>
							发消息
						</Button>
				}
			</div>

			<Modal title='同意申请'
						 width='400px'
						 visible={agreeVisible}
						 onOk={toAgreeAddContact}
						 onCancel={() => setAgreeVisible(false)}>
				设置好友备注【{data.nickname}】：
				<Input placeholder={data.applyRemark}
							 style={{ margin: '20px 0' }}
							 value={nicknameRemark}
							 onChange={(e) => setNicknameRemark(e.target.value)}/>
			</Modal>
		</div>
	)
}