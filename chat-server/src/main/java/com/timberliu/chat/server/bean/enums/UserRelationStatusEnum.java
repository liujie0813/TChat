package com.timberliu.chat.server.bean.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author liujie
 * @date 2021/10/14
 */
@Getter
@AllArgsConstructor
public enum UserRelationStatusEnum {

	UN_APPLY(0, "未申请"),
	APPLY(1, "已申请"),
	ADDED(2, "已添加"),
	OVERDUE(3, "已过期")
	;

	@EnumValue
	@JsonValue
	private Integer code;

	private String msg;

}
