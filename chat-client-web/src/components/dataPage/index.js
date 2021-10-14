import React from "react";
import './dataPage.css'
import {useSelector} from "react-redux";
import ChatPage from "./chatDataPage/chatPage";
import NewContactPage from "./contactDataPage/newContactPage";
import GroupPage from "./contactDataPage/groupPage";
import ContactPage from "./contactDataPage/contactPage";

export default function DataPage() {
	const { activeMenu, activeContact, page } = useSelector(state => state.user);

	if (activeMenu === 'chatMenu' && page.type === 'chatPage') {
		return (
			<ChatPage/>
		)
	} else if (activeMenu === 'contactMenu' && page.type === 'contactInfoPage') {
		if (!activeContact.hasOwnProperty('type')) {
			return <div/>
		}
		if (activeContact.type === 0) {
			return ( <NewContactPage/> )
		} else if (activeContact.type === 1) {
			return ( <GroupPage/> )
		} else if (activeContact.type === 2) {
			return ( <ContactPage/> )
		}
	} else {
		return (
			<div style={{height: '100%', width: 'auto'}}>

			</div>
		)
	}
}