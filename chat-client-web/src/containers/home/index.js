import React, {useState} from 'react'
import {Avatar, Input, Layout, message, Space} from 'antd'
import './home.css'
import img1 from '../../common/images/head_portrait.png';
import img2 from '../../common/images/chat_unactive.png';
import img3 from '../../common/images/chat_active.png';
import img4 from '../../common/images/contact_unacitve.png';
import img5 from '../../common/images/contact_active.png';
import img6 from '../../common/images/quit.png';

const { Content } = Layout;
const { Search } = Input;

export default function Home() {
	const {chatMenu, setMenu} = useState({});

	const onSearch = value => {
		message.warn('这是个假的搜索，哈哈哈');
	}

	const onChatPage = e => {
		e.target.src = img3;
		console.log('chat page');
	}

	const onContactPage = e => {
		e.target.src = img5;
		console.log('contact page');
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<Content className='P-background'>
				<div style={{ margin: '5% 15%', height: '80%', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
					<div style={{ height: '100%', }}>
						<div style={{ height: '100%', width: '60px', backgroundColor: '#e5e5e4', float: 'left', position: 'relative' }}>
							<div style={{ padding: '10px' }}>
								<Avatar size={40} src={img1} />
							</div>

							<div style={{ padding: '18px' }} id='chatPageMenu'>
								<a onClick={ onChatPage }>
									<Avatar shape="square" size={24} src={img2}/>
								</a>
							</div>

							<div style={{ padding: '18px' }} id='contactPageMenu'>
								<a onClick={ onContactPage }>
									<Avatar shape="square" size={24} src={img4}/>
								</a>
							</div>

							<div style={{ padding: '18px', position: 'absolute', left: '0', bottom: '0' }}>
								<Avatar shape="square" size={24} src={img6} />
							</div>
						</div>

						<div style={{ height: '100%', width: '270px', backgroundColor: '#f7f7f7', borderRight: 'solid 1px #e0e0e0', float: 'left' }}>
							<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '60px' }}>
								<Space direction="vertical" style={{ marginLeft: '10px', marginTop: '20px' }}>
									<Search placeholder="搜索" allowClear onSearch={ onSearch } style={{ width: '250px' }}/>
								</Space>
							</div>
						</div>

						<div style={{ height: '100%', width: 'auto', backgroundColor: '#f3f3f3' }}>
							<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '60px' }}>
								<div>会话名</div>
							</div>

							<div style={{ borderBottom: 'solid 1px #e0e0e0', height: '70%' }}>
								<div>聊天记录区</div>
							</div>

							<div style={{ height: 'auto' }}>
								<div>输入区</div>
							</div>
						</div>
					</div>
				</div>
			</Content>
		</Layout>
	)
}