package com.timberliu.chat.server.dao.redis;

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

	AUTH_ACCESS_TOKEN("auth_access_token:%s", RedisKeyTypeEnum.STRING, null, Duration.ofDays(1));

	private final String keyTemplate;

	private RedisKeyTypeEnum keyType;

	private final Class<?> valueType;

	private final Duration timeout;
}