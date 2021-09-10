import React from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, Input, message} from 'antd'
import './login.css'

import {setChatList, setContactList, setUserInfo} from "../../store/features/UserSlice";
import {createWebSocket} from "../../components/websocket";
import {initChatRecord} from "../../store/features/TalkRecord";

export default function Login() {
	const { userInfo } = useSelector(state => state.user)

	const history = useHistory();
	const dispatch = useDispatch();

	// 建立 websocket
	const establishConnect = async () => {
		createWebSocket()
	}

	// 获取会话列表
	const getTalkList = async (data) => {
		console.log("getTalkList req: ", data)
		try {
			const params = { userId: data.userId }
			const res = await axios.get('http://localhost:18080/chat/talkList', { params });
			const payload = res.data;
			console.log("getTalkList resp: ", payload)
			if (payload.code === 0) {
				dispatch(setChatList([{talkId: -1}, ...payload.data]));
			} else {
				message.warn("获取会话列表: " + payload.msg)
			}
		} catch (err) {
			message.error("获取会话列表: " +  err.message)
		}
	}

	const getChatRecords = async (data) => {
		console.log("getChatRecords req: ", data)
		try {
			const params = { userId: data.userId }
			const res = await axios.get('http://localhost:18080/chat/chatRecords', { params });
			const payload = res.data;
			console.log("getChatRecords resp: ", payload)
			if (payload.code === 0) {
				dispatch(initChatRecord(payload));
			} else {
				message.warn("获取聊天记录：" + payload.msg)
			}
		} catch (err) {
			message.error("获取聊天记录：" + err.message)
		}
	}

	// 获取联系人列表
	const getContactList = async (data) => {
		console.log("getContactList req: ", data)
		try {
			const params = { userId: data.userId }
			const res = await axios.get('http://localhost:18080/contact/getContactList', { params } );
			const payload = res.data;
			console.log("getContactList resp: ", payload)
			if (payload.code === 0) {
				dispatch(setContactList([{userId: -2}, ...payload.data]));
			} else {
				message.warn("获取联系人列表：" + payload.msg)
			}
		} catch (err) {
			message.error("获取联系人列表：" + err.message)
		}
	}

	// 登录
	const toLogin = async (params) => {
		console.log("toLogin req: ", params)
		try {
			const res = await axios.get('http://localhost:18080/user/login', { params });
			const payload = res.data;
			console.log("toLogin resp: ", payload)
			if (payload.code === 0) {
				dispatch(setUserInfo(payload.data));
				establishConnect();
				getTalkList(payload.data);
				getChatRecords(payload.data);
				getContactList(payload.data);
				history.push('/home')
			} else {
				message.warn("登录：" + payload.msg)
			}
		} catch (err) {
			message.error("登录：" + err.message)
		}
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
		</div>
	)
}