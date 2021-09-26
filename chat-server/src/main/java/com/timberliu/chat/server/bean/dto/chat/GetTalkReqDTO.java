package com.timberliu.chat.server.bean.dto.chat;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Data
public class GetTalkReqDTO {

	@NotNull(message = "用户 Id 不能为空")
	private Long userId;

	private Long pageNum = 1L;

	private Long pageSize = 10L;

}
