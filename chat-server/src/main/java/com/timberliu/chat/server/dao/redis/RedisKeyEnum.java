package com.timberliu.chat.server.dao.redis;

import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Duration;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Getter
@AllArgsConstructor
public enum RedisKeyEnum {

	AUTH_ACCESS_TOKEN("auth_access_token:%s", RedisKeyTypeEnum.STRING, AuthAccessTokenEntity.class, Duration.ofHours(2)),
//	AUTH_REFRESH_TOKEN("auth_refresh_token:%s", RedisKeyTypeEnum.STRING, AuthRefreshTokenEntity.class, null),
	;

	private final String keyTemplate;

	private RedisKeyTypeEnum keyType;

	private final Class<?> valueType;

	private final Duration timeout;
}