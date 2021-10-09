import {Avatar, Button, Dropdown, Form, Input, Menu, message, Modal, Transfer} from "antd";
import React, {useState} from "react";
import './search.css'
import {PlusOutlined, TeamOutlined, UserAddOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {addContact, createGroup, getContactList, searchByAccount} from "../api/user";
import {getAvatar} from "../common/avatar";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {useDispatch, useSelector} from "react-redux";
import {setContactList, setOrUpdateGroupChatData} from "../../store/features/userSlice";

const { Search } = Input;

export default function SearchBox() {
	const {
		userInfo, contactList, contactMap
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [addVisible, setAddVisible] = useState(false);
	const [addUserPageVisible, setAddUserPageVisible] = useState(false);
	const [addedUserItemVisible, setAddedUserItemVisible] = useState(false);
	const [addedUser, setAddedUser] = useState(null);
	const [createGroupPageVisible, setCreateGroupPageVisible] = useState(false);

	const [transferTargetKeys, setTransferTargetKeys] = useState([]);

	const contactData = [];
	contactList.forEach(contact => {
		contactData.push({
			key: contact.userId,
			...contact
		})
	})

	const onSearch = value => {
		message.warn('这是个假的搜索，哈哈哈');
	}

	const showAddUser = () => {
		setAddVisible(false)
		setAddUserPageVisible(true)
	}

	const onSearchAccount = account => {
		if (account.length < 6 || account.length > 20 || !isDigitOrLetter(account)) {
			setAddedUserItemVisible(false)
			message.warn('账号必须是 6-20 位数字或字母');
			return
		}
		let resp = searchByAccount(account);
		resp.then(data => {
			setAddedUser(data)
			setAddedUserItemVisible(true)
		})
	}

	const toAddUser = () => {
		let resp = addContact(userInfo.userId, addedUser.userId);
		resp.then(data => {
			if (data) {
				message.success("添加成功")
			} else {
				message.success("添加失败")
			}
			toGetContactList(userInfo.userId)
		})
	}

	// 获取联系人列表
	const toGetContactList = (userId) => {
		let resp = getContactList(userId);
		resp.then(data => {
			dispatch(setContactList(data));
		});
	};

	const showCreateGroup = () => {
		setAddVisible(false)
		setCreateGroupPageVisible(true)
	}

	const transferChange = (nextTargetKeys, direction, moveKeys) => {
		setTransferTargetKeys(nextTargetKeys)
	}

	const onFinish = (values) => {
		console.log('[]', values)
		let resp = createGroup(values.groupName, userInfo.userId, values.memberIds)
		resp.then(success => {
			if (success) {
				setCreateGroupPageVisible(false)

				// dispatch(setOrUpdateGroupChatData({
				//
				// }))
			}
		})
	}

	return (
		<div style={{ borderBottom: 'solid 1px #e0e0e0', width: '300px', height: '64px' }}>
			<div style={{ padding: '18px 0 12px 18px' }}>
				<Search placeholder="搜索" allowClear onSearch={ onSearch } style={{ width: '220px' }}/>
				<Button icon={<PlusOutlined />} size={18} style={{ marginLeft: '12px' }} onClick={() => setAddVisible(true)}/>
			</div>
			<Modal wrapClassName='addUser'
						 visible={addVisible}
						 closable={false}
						 mask={false}
						 maskClosable={true}
						 footer={null}
						 onCancel={() => setAddVisible(false)}
						 width={160}
						 bodyStyle={{ backgroundColor: '#888', borderRadius: '8px' }}
						 style={{ marginTop: '-45px', marginLeft: '192px' }}>
				<Button ghost icon={<UserAddOutlined />}
								style={{ marginBottom: '4px' }}
								onClick={showAddUser}>
					添加好友
				</Button>
				<Button ghost icon={<UsergroupAddOutlined />}
								onClick={showCreateGroup}>
					创建群组
				</Button>
			</Modal>

			<Modal title='添加好友'
						 visible={addUserPageVisible}
						 footer={null}
						 bodyStyle={{ height: '280px', padding: '24px 36px 0 36px' }}
						 onCancel={ () => setAddUserPageVisible(false) }>
				<Dropdown overlay={
						<Menu>
							<Menu.Item key='addedUser' style={{ width: '448px' }}>
								{ addedUser && getAvatar(addedUser.avatarUrl, addedUser.account, addedUser.nickname, 36) }
								<div style={{ display: 'inline-block', width: '300px', marginLeft: '8px' }}>
									{ addedUser && (addedUser.nickname ? addedUser.nickname : addedUser.account) }
								</div>
								{ addedUser && (addedUser.account === userInfo.account || contactMap[addedUser.account]) ?
										<Button type='primary' disabled>已添加</Button> :
										<Button type='primary' onClick={toAddUser} style={{ marginLeft: '12px' }}>添加</Button>
								}
							</Menu.Item>
						</Menu>
					}
					trigger='contextMenu'
					visible={addedUserItemVisible}
					onVisibleChange={ (visible) => {
						setAddedUserItemVisible(visible)
					}}
					placement='bottomLeft'>
					<Search placeholder="搜索账号" allowClear onSearch={ onSearchAccount }/>
				</Dropdown>
			</Modal>

			<Modal title='创建群组'
						 width={800}
						 visible={createGroupPageVisible}
						 footer={null}
						 bodyStyle={{ padding: '24px 36px 12px 36px' }}>
				<Form className='createGroupForm'
							labelCol={{ span: 3 }}
							wrapperCol={{ span: 20 }}
							onFinish={onFinish}>
					<Form.Item label='群名称' name='groupName'>
						<Input placeholder='输入群名称（选填）'/>
					</Form.Item>
					<Form.Item label='群头像' name='groupAvatar'>
						<Avatar icon={<TeamOutlined />} size={32} style={{ backgroundColor: '#fe6673' }}/>
					</Form.Item>
					<Form.Item label='邀请' name='memberIds'
					  rules={[
						  {
						  	validator: async (rule, value) => {
						  		if (transferTargetKeys.length <= 1) {
										throw new Error('必须选择 2 人及以上');
									}
								}
						  }
						]}
					>
						<Transfer
							dataSource={contactData}
							showSearch
							listStyle={{
								width: '320px',
								height: '330px'
							}}
							targetKeys={transferTargetKeys}
							onChange={transferChange}
							render={contact => {
								return (
									<div>
										{ contact &&
										getAvatar(contact.avatarUrl, contact.account, contact.nickname, 32)}
										<div style={{ display: 'inline-block', marginLeft: '12px' }}>
											{ contact.nicknameRemark ? contact.nicknameRemark : contact.nickname }
										</div>
									</div>
								)
							}}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 18, span: 6 }}>
						<Button onClick={ () => {console.log('取消')}} style={{ margin: '0 12px 0 12px' }}>
							取消
						</Button>
						<Button type="primary" htmlType="submit">
							创建
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)

}