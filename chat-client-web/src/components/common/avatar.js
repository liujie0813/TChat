import {Avatar} from "antd";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {getColor} from "../../common/util/cssUtil";
import React from "react";

export function getAvatar(avatarUrl, account, nickname, size) {
	if (avatarUrl) {
		return (
			<Avatar src={avatarUrl} size={size}/>
		)
	} else {
		let showName;
		if (nickname && isDigitOrLetter(nickname.substring(0, 6))) {
			showName = nickname.substring(0, 6);
		} else if (account) {
			showName = account.substring(0, 6);
		}
		let backgroundColor = getColor(account);
		let gap = parseInt(size / 10);
		return (
			<Avatar style={{ color: '#fff', backgroundColor }} size={size} gap={gap}>
				{showName}
			</Avatar>
		)
	}
}