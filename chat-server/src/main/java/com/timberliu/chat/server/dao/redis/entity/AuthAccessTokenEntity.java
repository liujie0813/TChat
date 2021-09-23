package com.timberliu.chat.server.dao.redis.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class AuthAccessTokenEntity extends BaseEntity {

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

	/**
	 * 创建 IP
	 */
	private String createIp;
}
