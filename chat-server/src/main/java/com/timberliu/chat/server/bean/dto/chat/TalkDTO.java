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
	private Integer type;

	/**
	 * 单聊：userId
	 * 群聊：groupId
	 */
	private Integer talkId;

	/**
	 * 会话名称
	 */
	private String talkName;

	/**
	 * 最近 100 条记录
	 */
	private List<RecordDTO> records;

}
