import React, { Component } from 'react'
import { Layout } from 'antd'
import './login.css'

const { Header, Content, Footer } = Layout;

class Login extends Component {
	render() {
		return (
			<Layout className="P-layout">
				<Header className="P-header">Header</Header>
				<Content style={{ padding: '20px 50px 0', width: '100%' }}>
					<div className="P-content">Content</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>TChat ©2021 Created by TimberLiu</Footer>
			</Layout>
		)
	}
}

export default Login