import InfiniteScroll from "react-infinite-scroller";
import {Badge, Button, List} from "antd";
import {getAvatar} from "../common/avatar";
import {getDateTime} from "../common/time";
import {getCreateSingleNotice, getJoinGroupNotice} from "../common/getJoinGroup";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setChatData} from "../../store/features/userSlice";
import {updateUnreadNum} from "../api/user";

export function ChatMenuPage() {
	const {
		activeChat, userInfo, chatRecordList, userIdMap, groupMap,
		chatRecordMap
	} = useSelector(state => state.user);
	const dispatch = useDispatch();

	const chatTabClick = (type, key) => {
		dispatch(setChatData({
			type,
			key
		}));
		if (chatRecordMap[key].unreadNum) {
			updateUnreadNum(userInfo.userId, chatRecordMap[key].talkId);
		}
	};

	return (
		<div style={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}>
			<InfiniteScroll
				pageStart={0}
				loadMore={() => {}}
				hasMore={false}
				loader={ <div/> }
				useWindow={false}
				className='singleContactList'>
				{/* 循环遍历 */}
				<List
					dataSource={ chatRecordList }
					renderItem={ chatRecord => {
						let recordLen = chatRecord.records.length;
						let lastRecord;
						if (recordLen > 0) {
							lastRecord = chatRecord.records[recordLen - 1]
						}
						return (
							<List.Item key={chatRecord.talkId} className={ (activeChat && chatRecord.talkId === activeChat.key) ? 'contactActive' : ''}>
								<Button type='link' style={{ height: '72px' }}
												onClick={() => chatTabClick(chatRecord.talkType, chatRecord.talkId)}>
									<div style={{ width: '299px', height: '70px', padding: '0 16px', textAlign: 'left', display: 'flex' }}>
										<div style={{ padding: '15px 0'}}>
											<Badge count={chatRecord.unreadNum} size='small' offset={[-3, 3]}>
												{ getAvatar(chatRecord.avatarUrl, chatRecord.talkType, chatRecord, 40) }
											</Badge>
										</div>
										<div style={{ marginLeft: '10px', padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
											<div style={{ display: 'flex' }}>
												<div style={{ width: '146px', maxWidth: '146px', color: '#000' }} className='overWidth'>{ chatRecord.talkName }</div>
												<div style={{ width: '70px', textAlign: 'right', fontSize: '10px', color: 'rgba(153, 153, 153)' }}>
													{ recordLen > 0 && getDateTime(chatRecord.records[recordLen - 1].sendTime, false) }
												</div>
											</div>
											<div style={{ fontSize: '12px', paddingTop: '6px', color: 'rgba(153, 153, 153)', maxWidth: '216px' }}
													 className='overWidth'>
												{ recordLen > 0 &&
												(lastRecord.msgType === 2 ?
													( groupMap[chatRecord.groupId] && getJoinGroupNotice(groupMap[chatRecord.groupId].memberMap, userInfo.userId, lastRecord.fromId, lastRecord.content, userIdMap) ) :
													(lastRecord.msgType === 3 ?
														getCreateSingleNotice(chatRecord.talkName) :
														chatRecord.records[recordLen - 1].content) )
												}
											</div>
										</div>
									</div>
								</Button>
							</List.Item>
						)
					}}>
				</List>
			</InfiniteScroll>
		</div>
	)
}