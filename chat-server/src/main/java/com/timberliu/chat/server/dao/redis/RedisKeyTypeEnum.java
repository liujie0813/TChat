package com.timberliu.chat.server.dao.redis;

/**
 * @author liujie
 * @date 2021/9/23
 */

public enum RedisKeyTypeEnum {

	STRING,
	LIST,
	HASH,
	SET,
	ZSET,
	STREAM,
	PUBSUB;
}
