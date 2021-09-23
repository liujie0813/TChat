package com.timberliu.chat.server.bean.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @author Timber
 * @date 2021/9/23
 */
@Data
@Accessors(chain = true)
public class AuthCreateTokenReqDTO implements Serializable {

	/**
	 * 用户Id
	 */
	@NotNull(message = "用户 Id 不能为空")
	private Long userId;

	/**
	 * 创建IP
	 */
	private String createIp;
}
