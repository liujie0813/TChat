import React, { Component } from 'react'
import { Layout, Row, Col, Image } from 'antd'
import './login.css'
import img1 from '../../common/images/background01.jpg'

const { Header, Content, Footer } = Layout;

class Login extends Component {
	render() {
		return (
			<Layout style={{ height: '100vh' }}>
				<Header className="P-L-header">
					<div style={{ margin: '24px', font: 'italic 1.2em Georgia, serif' }}>
						TChat
					</div>
				</Header>
				<Content style={{ margin: '30px 50px', backgroundColor: '#fff' }}>
					<Row style={{ margin: '100px 100px', backgroundColor: '#4169E1' }}>
						<Col span={12}>
							<Image src={img1}/>
						</Col>
						<Col span={12}>
							<div>表单</div>
						</Col>
					</Row>
				</Content>
			</Layout>
		)
	}
}

export default Login