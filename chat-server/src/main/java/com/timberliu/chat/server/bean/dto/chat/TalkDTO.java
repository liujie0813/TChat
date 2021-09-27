package com.timberliu.chat.server.bean.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/9
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TalkDTO {

	/**
	 * 单聊: 0
	 * 群聊: 1
	 */
	private Integer talkType;

	/**
	 * 单聊：userId
	 * 群聊：groupId
	 */
	private Long talkId;

	/**
	 * 会话名称
	 *  单聊：对方 昵称、备注或账号
	 *  群聊：群组 群名或备注
	 */
	private String talkName;

	/**
	 * 头像 url
	 */
	private String avatarUrl;

	/**
	 * 未读消息数
	 */
	private Integer unreadNum;

	/**
	 * 最近 15 天消息
	 */
	private List<RecordDTO> records;

}
