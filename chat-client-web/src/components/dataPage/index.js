import React from "react";
import './dataPage.css'
import {useSelector} from "react-redux";
import ChatPage from "./chatPage";
import ContactPage from "./contactPage";

export default function DataPage() {
	const { activeMenu, page } = useSelector(state => state.user);

	if (activeMenu === 'chatMenu' && page.type === 'chatPage') {
		return (
			<ChatPage/>
		)
	} else if (activeMenu === 'contactMenu' && page.type === 'contactInfoPage') {
		return (
			<ContactPage/>
		)
	} else {
		return (
			<div style={{height: '100%', width: 'auto'}}>

			</div>
		)
	}
}