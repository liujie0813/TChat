package com.timberliu.chat.server.dao.redis;

import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
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
	CHAT_RECORD("chat_record:%s", RedisKeyTypeEnum.STRING, HistoryMsgEntity.class, Duration.ofDays(15)),
	UNREAD_MSG_NUM("unread_msg_num:%s", RedisKeyTypeEnum.STRING, HistoryMsgEntity.class, Duration.ofDays(15)),
	UNREAD_APPLY_NUM("unread_apply_num:%s", RedisKeyTypeEnum.STRING, HistoryMsgEntity.class, Duration.ofDays(15)),
	TALK_ID("talk_id", RedisKeyTypeEnum.STRING, Long.class, Duration.ZERO);

	private final String keyTemplate;

	private RedisKeyTypeEnum keyType;

	private final Class<?> valueType;

	private final Duration timeout;
}