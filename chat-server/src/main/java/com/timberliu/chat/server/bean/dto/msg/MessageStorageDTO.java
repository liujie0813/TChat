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

	private Long talkId;

	private String content;

}
