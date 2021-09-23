package com.timberliu.chat.server.bean.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Timber
 * @date 2021/9/23
 */
@Data
@Accessors(chain = true)
public class AuthAccessTokenRespDTO implements Serializable {

	/**
	 * 用户Id
	 */
	private Long userId;

	/**
	 * 访问令牌
	 */
	private String accessToken;

	/**
	 * 刷新令牌
	 */
	private String refreshToken;

	/**
	 * 过期时间
	 */
	private Date expireTime;

}
