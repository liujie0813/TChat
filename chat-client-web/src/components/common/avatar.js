import {Avatar} from "antd";
import {isDigitOrLetter} from "../../common/util/stringUtil";
import {getColor} from "../../common/util/cssUtil";
import React from "react";
import {TeamOutlined} from "@ant-design/icons";

/**
 * avatarType:
 *  0：个人
 *    data：talkName/nickname/nickname
 *  1：群组
 */
export function getAvatar(avatarUrl, avatarType, data, size) {
	if (avatarUrl) {
		return (
			<Avatar src={avatarUrl} size={size}/>
		)
	} else {
		if (avatarType === 0) {
			let showName;
			if (data.talkName && isDigitOrLetter(data.talkName.substring(0, 6))) {
				showName = data.talkName.substring(0, 6);
			} else if (data.nickname && isDigitOrLetter(data.nickname.substring(0, 6))) {
				showName = data.nickname.substring(0, 6);
			} else if (data.account) {
				showName = data.account.substring(0, 6);
			}
			let backgroundColor = getColor(data.account);
			let gap = parseInt(size / 10);
			return (
				<Avatar style={{color: '#fff', backgroundColor}} size={size} gap={gap}>
					{showName}
				</Avatar>
			)
		} else if (avatarType === 1) {
			return (
				<Avatar icon={<TeamOutlined />} size={size} style={{ border: '1px solid #00a2ae', color: '#00a2ae', backgroundColor: '#fff' }}/>
			)
		}
	}
}