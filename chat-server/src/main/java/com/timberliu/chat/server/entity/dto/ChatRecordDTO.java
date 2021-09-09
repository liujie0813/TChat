package com.timberliu.chat.server.entity.dto;

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
public class ChatRecordDTO {

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

	private String talkName;

	private List<Record> records;

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Record {

		private Integer msgId;

		/*
		 * 文本: 0
		 * 图片: 1
		 */
		private Integer msgType;

		private Long fromId;

		private String from;

		private Long toId;

		private String to;

		private String content;

		private Long msgTime;
	}

}
