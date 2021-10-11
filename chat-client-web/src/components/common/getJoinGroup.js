
export function getJoinGroupNotice(groupMemberMap, selfUserId, inviterId, inviteeIdsStr, userIdMap) {
	let inviter;
	if (inviterId === selfUserId) {
		inviter = '你';
	} else {
		inviter = userIdMap[inviterId] ? userIdMap[inviterId] : groupMemberMap[inviterId].nickname;
	}
	let invitee = [];
	let memberIds = JSON.parse(inviteeIdsStr);
	for (let i = 0; i < memberIds.length; i++) {
		let memberId = memberIds[i];
		if (memberId === selfUserId) {
			invitee.push('你')
		} else {
			invitee.push(userIdMap[memberId] ? userIdMap[memberId] : groupMemberMap[memberId].nickname);
		}
	}
	return inviter + ' 邀请 ' + invitee.join('、') + ' 加入了群组';
}