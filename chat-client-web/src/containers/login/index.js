import React, { Component } from 'react'
import Header from '../../components/header'
import './login.css'

class Login extends Component {
	render() {
		return (
			<div className="P-login">
				<Header/>
				<h1>Login page</h1>
				<button onClick={() => {this.gotoHome()}}>跳转 home 页</button>
			</div>
		)
	}

	gotoHome() {
		this.props.history.push('/home')
	}
}

export default Login