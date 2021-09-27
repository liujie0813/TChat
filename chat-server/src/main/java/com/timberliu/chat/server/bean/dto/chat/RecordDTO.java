package com.timberliu.chat.server.bean.dto.chat;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Data
public class RecordDTO {

	private Long msgId;

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

	private Long sendTime;

}
