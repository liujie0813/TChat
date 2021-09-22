package com.timberliu.chat.server.bean.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 会话
 *
 * @author liujie
 * @date 2021/9/6
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

	private String talkName;

	/**
	 * 群聊：最新消息的用户
	 */
	private String latestSender;

	private String latestMsg;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date msgTime;
}
