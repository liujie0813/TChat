import Search from "antd/es/input/Search";
import InfiniteScroll from "react-infinite-scroller";
import {Button, Drawer, List} from "antd";
import {getAvatar} from "../../common/avatar";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export function ChatPageDrawer(props) {
	const {
		drawerVisible, setDrawerVisible,
		setMember, setMemberInfoVisible
	} = props;

	const {
		activeChat, groupMap, chatRecordMap
	} = useSelector(state => state.user);
	const chatRecord = chatRecordMap[activeChat.key];

	const memberClick = (member) => {
		setMember(member);
		setMemberInfoVisible(true)
	}

	const onSearchMember = () => {

	}

	return (
		<Drawer className='chatPageDrawer'
						closable={false}
						width={260}
						maskStyle={{ backgroundColor: 'transparent'}}
						placement="right"
						style={{ marginTop: '63px' }}
						drawerStyle={{ border: '1px solid #e0e0e0', backgroundColor: '#fff' }}
			// bodyStyle={{ backgroundColor: '#fff' }}
						onClose={() => setDrawerVisible(false)}
						visible={drawerVisible}>
			<div style={{ color: 'rgba(153, 153, 153)', fontSize: '12px' }}>
				群组名称
			</div>
			<div style={{ margin: '4px 0 14px' }}>
				{ groupMap[chatRecord.groupId] && groupMap[chatRecord.groupId].groupName }
			</div>
			<div style={{ color: 'rgba(153, 153, 153)', fontSize: '12px' }}>
				备注
			</div>
			<div style={{ margin: '4px 0 24px' }}>
				{ groupMap[chatRecord.groupId] && (groupMap[chatRecord.groupId].groupNameRemark ? groupMap[chatRecord.groupId].groupNameRemark : '无')  }
			</div>
			<Search placeholder="搜索群成员" allowClear onSearch={ onSearchMember }
							style={{ marginLeft: '-2px', marginBottom: '10px', width: '222px' }}/>
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
						dataSource={ groupMap[chatRecord.groupId] ? groupMap[chatRecord.groupId].members : [] }
						renderItem={ member => (
							<List.Item key={member.account}>
								<Button type='text' style={{ height: '56px' }} onClick={() => memberClick(member)}>
									<div style={{ textAlign: 'left'}}>
										{ member &&
										getAvatar(member.avatarUrl, 0, member, 36)}
										<div style={{ display: 'inline-block', marginLeft: '12px' }}>
											{ member.nicknameRemark ? member.nicknameRemark : member.nickname }
										</div>
									</div>
								</Button>
							</List.Item>
						)}>
					</List>
				</InfiniteScroll>
			</div>
		</Drawer>
	)
}