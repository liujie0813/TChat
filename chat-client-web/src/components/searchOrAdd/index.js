import {Button, Dropdown, Input, Menu, message, Modal} from "antd";
import React, {useState} from "react";
import './search.css'
import {PlusOutlined, UserAddOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {addContact, getContactList, searchByAccount} from "../../api/user";
import {getAvatar} from "../person/personInfo";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {useDispatch, useSelector} from "react-redux";
import {setContactList} from "../../store/features/userSlice";

const { Search } = Input;

export default function SearchBox() {
	const {
		userInfo
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [addVisible, setAddVisible] = useState(false);
	const [addUserPageVisible, setAddUserPageVisible] = useState(false);
	const [addedUserItemVisible, setAddedUserItemVisible] = useState(false);
	const [addedUser, setAddedUser] = useState(null);

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
				<Button ghost icon={<UsergroupAddOutlined />}> 创建群组</Button>
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
								<div style={{ display: 'inline-block', width: '312px', marginLeft: '8px' }}>
									{ addedUser && (addedUser.nickname ? addedUser.nickname : addedUser.account) }
								</div>
								<Button type='primary' onClick={toAddUser}>添加</Button>
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

		</div>
	)

}