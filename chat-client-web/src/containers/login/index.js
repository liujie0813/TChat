import React from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Input, Layout, message} from 'antd'
import './login.css'

import {setChatList, setContactList, setUserInfo} from "../../store/features/UserSlice";
import {createWebSocket} from "../../components/websocket";
import {initChatRecord} from "../../store/features/TalkRecord";

const { Header, Content } = Layout;

export default function Login() {
	const { userInfo } = useSelector(state => state.user)

	const history = useHistory();
	const dispatch = useDispatch();

	// 建立 websocket
	async function establishConnect() {
		createWebSocket()
	}

	// 获取会话列表
	async function getTalkList(userId) {
		try {
			const res = await axios.get('http://localhost:18080/chat/talkList', { userId });
			const payload = res.data;
			if (payload.code === 0) {
				dispatch(setChatList([{talkId: -1}, ...payload.data]));
			} else {
				message.warn(payload.msg)
			}
		} catch (err) {
			message.error(err.message)
		}
	}

	async function getChatRecords(userId) {
		try {
			const res = await axios.get('http://localhost:18080/chat/chatRecords', { userId });
			const payload = res.data;
			if (payload.code === 0) {
				dispatch(initChatRecord(payload));
			} else {
				message.warn(payload.msg)
			}
		} catch (err) {
			message.error(err.message)
		}
	}

	// 获取联系人列表
	async function getContactList(userId) {
		try {
			const res = await axios.get('http://localhost:18080/contact/getContactList', { userId } );
			const payload = res.data;
			if (payload.code === 0) {
				dispatch(setContactList([{userId: -2}, ...payload.data]));
			} else {
				message.warn(payload.msg)
			}
		} catch (err) {
			message.error(err.message)
		}
	}
	// 登录
	const toLogin = async (params) => {
		console.log("login: " + params)
		try {
			const res = await axios.get('http://localhost:18080/user/login', { params: params });
			const payload = res.data;
			if (payload.code === 0) {
				dispatch(setUserInfo(payload.data));
				let userId = payload.data.userId;
				establishConnect();
				getTalkList(userId);
				getChatRecords(userId);
				getContactList(userId);
				history.push('/home')
			} else {
				message.warn(payload.msg)
			}
		} catch (err) {
			message.error(err.message)
		}
	};

	return (
		<Layout style={{ height: '100vh' }}>
			<Header className="P-L-header">
				<div style={{ margin: '18px 13%', font: 'italic 1.8em Georgia, serif' }}>
					TChat
				</div>
			</Header>
			<Content className='P-background'>
				<div style={{ margin: '3% 15%', padding: '13% 10%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
					<div>
						<Form
							name="basic"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 8 }}
							onFinish={toLogin}
						>
							<Form.Item label="账号" name="username"
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

			</Content>
		</Layout>
	)
}