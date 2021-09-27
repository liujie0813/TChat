package com.timberliu.chat.server.bean.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 消息类型
 *
 * @author liujie
 * @date 2021/9/27
 */
@AllArgsConstructor
@Getter
public enum MsgTypeEnum {

	TEXT(0, "文本"),
	IMAGE(1, "图片");

	private final Integer code;

	private final String desc;

}
