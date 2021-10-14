import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button, Form, Input} from 'antd'
import './login.css'

import {setLoginResp} from "../../store/features/userSlice";
import {loginByAccount} from "../../components/api/user";
import SocketInstance from "../../components/websocket/socketInstance";
import {messageType} from "../../components/websocket/messageType";
import {toGetApplyList, toGetContactList, toGetGroupList, toGetTalkList} from "../../components/api/userEncapsulation";

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		SocketInstance.connect()
	}, []);

	// 登录
	const toLogin = (params) => {
		let resp = loginByAccount(params.account, params.password);
		resp.then(data => {
			dispatch(setLoginResp(data));
			SocketInstance.send(messageType.AuthRequestMessage, {
				accessToken: data.accessToken
			})
			let userId = data.userInfoDTO.userId;
			toGetTalkList(userId);
			toGetApplyList(userId);
			toGetContactList(userId);
			toGetGroupList(userId);
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