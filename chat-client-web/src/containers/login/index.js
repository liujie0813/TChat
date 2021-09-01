import React, {Component} from 'react'
import {Button, Form, Input, Layout} from 'antd'
import './login.css'

const { Header, Content } = Layout;

class Login extends Component {

	onFinish = (values) => {
		console.log('Success:', values);
		this.props.history.push('/home')
	}

	render() {
		return (
			<Layout style={{ height: '100vh' }}>
				<Header className="P-L-header">
					<div style={{ margin: '18px 150px', font: 'italic 1.8em Georgia, serif' }}>
						TChat
					</div>
				</Header>
				<Content className='P-background'>
					<div style={{ margin: '80px 200px', padding: '220px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
						<div style={{ width: '70%' }}>
							<Form
								name="basic"
								labelCol={{ span: 12 }}
								wrapperCol={{ span: 12 }}
								onFinish={this.onFinish}
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
								<Form.Item wrapperCol={{ offset: 12, span: 12 }}>
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
}

export default Login