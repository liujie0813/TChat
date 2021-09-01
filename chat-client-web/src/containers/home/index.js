import React, { Component } from 'react'
import {Button, Form, Input, Layout, Row, Col, Image, Menu, Avatar} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';
import img6 from '../../common/images/quit.png';

const { Content } = Layout;

class Home extends Component {
	constructor() {
		super();
	}

	handleClick = e => {
		console.log('click ', e);
	};

	render() {
		return (
			<Layout style={{ height: '100vh' }}>
				<Content className='P-background'>
					<div style={{ margin: '5% 15%', height: '80%', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
						<div style={{ height: '100%', borderRadius: '15px' }}>
							<div style={{ height: '100%', width: '5%', backgroundColor: '#e5e5e4', float: 'left', position: 'relative' }}>
								<div style={{ padding: '10px' }}>
									<Avatar size={42} src={img1} />
								</div>
								<div style={{ padding: '18px' }}>
									<Avatar shape="square" size={25} src={img2} />
								</div>
								<div style={{ padding: '18px' }}>
									<Avatar shape="square" size={25} src={img4} />
								</div>
								<div style={{ padding: '18px', position: 'absolute', left: '0', bottom: '0' }}>
									<Avatar shape="square" size={25} src={img6} />
								</div>
							</div>
							<div style={{ height: '100%', width: '22%', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0', float: 'left' }}>
								列表
							</div>
							<div style={{ height: '100%', width: '73%', backgroundColor: '#f3f3f3', float: 'right' }}>
								<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '8%' }}>
									<div>会话名</div>
								</div>
								<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '72%' }}>
									<div>聊天记录区</div>
								</div>
								<div style={{ height: '20%' }}>
									<div>输入区</div>
								</div>
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default Home