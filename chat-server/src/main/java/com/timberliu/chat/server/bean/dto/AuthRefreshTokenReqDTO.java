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
public class AuthRefreshTokenReqDTO implements Serializable {

	/**
	 * 刷新令牌
	 */
	private String refreshToken;

	/**
	 * 创建IP
	 */
	private String createIp;
}
