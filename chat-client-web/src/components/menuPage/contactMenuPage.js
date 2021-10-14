import InfiniteScroll from "react-infinite-scroller";
import {Button, Collapse, List} from "antd";
import {getAvatar} from "../common/avatar";
import React from "react";
import {applyStatusMap} from "../../containers/home";
import {useDispatch, useSelector} from "react-redux";
import {setContactData} from "../../store/features/userSlice";

const { Panel } = Collapse;

export function ContactMenuPage() {
	const {
		activeContact, contactList, applyList, groupList
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const contactTabClick = (type, key) => {
		dispatch(setContactData({
			type,
			key
		}))
	};

	return (
		<Collapse accordion className='secondList'>
			<Panel header='新的联系人' key='applyList'>
				<div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 202px)' }}>
					<InfiniteScroll
						pageStart={0}
						loadMore={() => {}}
						hasMore={false}
						loader={ <div/> }
						useWindow={false}
						className='singleContactList'>
						{/* 循环遍历 */}
						<List
							dataSource={ applyList }
							renderItem={ apply => (
								<List.Item key={apply.applyUserId} className={ (activeContact && apply.applyUserId === activeContact.key) ? 'contactActive' : ''}>
									<Button type='link' style={{ height: '68px' }}
													onClick={() => contactTabClick(0, apply.applyUserId)}>
										<div style={{ width: '248px', margin: '0 16px 0 36px', textAlign: 'left', display: 'flex' }}>
											<div style={{ padding: '16px 0'}}>
												{ getAvatar(apply.avatarUrl, 1, apply, 38) }
											</div>
											<div style={{ marginLeft: '10px', padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
												<div style={{ display: 'flex' }}>
													<div style={{ width: '150px', color: '#000' }}>{ apply.nickname }</div>
													<div style={{ width: '50px', textAlign: 'right', fontSize: '10px', color: `${apply.applyStatus === 1 ? '#0099CC' : 'rgba(153, 153, 153)'}` }}>
														{ apply.applyStatus === 1 ? '待处理' : applyStatusMap[apply.applyStatus] }
													</div>
												</div>
												<div style={{ fontSize: '12px', paddingTop: '4px', color: 'rgba(153, 153, 153)', maxWidth: '200px' }}
														 className='overWidth'>
													{ apply.applyRemark ? apply.applyRemark : '请求添加你为朋友' }
												</div>
											</div>
										</div>
									</Button>
								</List.Item>
							)}>
						</List>
					</InfiniteScroll>
				</div>
			</Panel>
			<Panel header='群组' key='groupList'>
				<div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 202px)' }}>
					<InfiniteScroll
						pageStart={0}
						loadMore={() => {}}
						hasMore={false}
						loader={ <div/> }
						useWindow={false}
						className='singleContactList'>
						{/* 循环遍历 */}
						<List
							dataSource={ groupList }
							renderItem={ group => (
								<List.Item key={group.groupId} className={ (activeContact && group.groupId === activeContact.key) ? 'contactActive' : ''}>
									<Button type='link' style={{ height: '68px' }}
													onClick={() => contactTabClick(1, group.groupId)}>
										<div style={{ width: '252px', margin: '0 12px 0 36px', textAlign: 'left'}}>
											{ group &&
											getAvatar(group.avatarUrl, 1, group, 36)}
											<div style={{ display: 'inline-block', marginLeft: '12px' }}>
												{ group.groupNameRemark ? group.groupNameRemark : group.groupName }
											</div>
										</div>
									</Button>
								</List.Item>
							)}>
						</List>
					</InfiniteScroll>
				</div>
			</Panel>
			<Panel header='联系人' key='contactList'>
				<div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 202px)' }}>
					<InfiniteScroll
						pageStart={0}
						loadMore={() => {}}
						hasMore={false}
						loader={ <div/> }
						useWindow={false}
						className='singleContactList'>
						{/* 循环遍历 */}
						<List
							dataSource={ contactList }
							renderItem={ contact => (
								<List.Item key={contact.account} className={ (activeContact && contact.account === activeContact.key) ? 'contactActive' : ''}>
									<Button type='link' style={{ height: '68px' }}
													onClick={() => contactTabClick(2, contact.account)}>
										<div style={{ width: '252px', margin: '0 12px 0 36px', textAlign: 'left'}}>
											{ contact &&
											getAvatar(contact.avatarUrl, 0, contact, 36)}
											<div style={{ display: 'inline-block', marginLeft: '12px' }}>
												{ contact.nicknameRemark ? contact.nicknameRemark : contact.nickname }
											</div>
										</div>
									</Button>
								</List.Item>
							)}>
						</List>
					</InfiniteScroll>
				</div>
			</Panel>
		</Collapse>
	)
}