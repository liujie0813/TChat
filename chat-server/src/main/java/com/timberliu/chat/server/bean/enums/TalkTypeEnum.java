package com.timberliu.chat.server.bean.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 会话类型
 *
 * @author liujie
 * @date 2021/9/27
 */
@AllArgsConstructor
@Getter
public enum TalkTypeEnum {

	SINGLE(0, "单聊"),
	GROUP(1, "群聊");

	private final Integer code;

	private final String desc;

}
