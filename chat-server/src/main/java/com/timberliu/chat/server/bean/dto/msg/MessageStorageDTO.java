package com.timberliu.chat.server.bean.dto.msg;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/9/29
 */
@Data
@Accessors(chain = true)
public class MessageStorageDTO {

	private Integer talkType;

	private Integer msgType;

	private Long fromId;

	/**
	 * 单聊：用户Id
	 * 群聊：群组Id
	 */
	private Long toId;

	private String content;

	private Long sendTime;
}
