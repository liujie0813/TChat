import React from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Button, Form, Input, Layout, message} from 'antd'
import './login.css'

import {setUserInfo} from "../../store/features/UserSlice";

const { Header, Content } = Layout;

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	const onFinish = async (params) => {
		try {
			const res = await axios.get('http://localhost:18080/user/login', { params: params });
			const payload = res.data;
			if (payload.code === 0) {
				dispatch(setUserInfo(payload.data));
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
							onFinish={onFinish}
						>
							<Form.Item label="昵称" name="username"
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