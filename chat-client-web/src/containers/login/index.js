import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button, Form, Input} from 'antd'
import './login.css'


import {setChatList, setContactList, setLoginResp} from "../../store/features/userSlice";
import {createWebSocket} from "../../components/websocket";
import {initChatRecord} from "../../store/features/talkRecord";
import {getChatRecords, getContactList, getTalkList, loginByAccount} from "../../api/user";

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	// 建立 websocket
	const establishConnect = () => {
		createWebSocket()
	};

	// 获取会话列表
	const toGetTalkList = (userId) => {
		let resp = getTalkList(userId);
		resp.then(data => {
			dispatch(setChatList(data));
		})
	};

	// 获取聊天记录
	const toGetChatRecords = (userId) => {
		let resp = getChatRecords(userId);
		resp.then(data => {
			dispatch(initChatRecord(data));
		})
	};

	// 获取联系人列表
	const toGetContactList = (userId) => {
		let resp = getContactList(userId);
		resp.then(data => {
			dispatch(setContactList(data));
		});
	};

	// 登录
	const toLogin = (params) => {
		let resp = loginByAccount(params.account, params.password);
		resp.then(data => {
			dispatch(setLoginResp(data));
			establishConnect();
			let userId = data.userInfoDTO.userId;
			toGetTalkList(userId);
			toGetChatRecords(userId);
			toGetContactList(userId);
			history.push('/home')
		});
	};

	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div style={{ background: '#fff', height: '80px', padding: '24px 0 0 15%', font: 'italic 28px Jandys'}}>
				TChat
			</div>
			<div style={{ background: '#f0f2f5', height: 'calc(100% - 80px)' }}>
				<div style={{ margin: '3% 15%', padding: '14% 12%', height: 'calc(94% - 80px)', backgroundColor: '#fff' }}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 8 }}
						onFinish={toLogin}
					>
						<Form.Item label="账号" name="account"
							rules={[
								{
									required: true,
									message: '请输入昵称',
								},
								{
									min: 6,
									message: '用户名不能少于 6 个字符'
								}
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item label="密码" name="password"
							rules={[
								{
									required: true,
									message: '请输入密码',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 8 }}>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>

			</div>
		</div>
	)
}