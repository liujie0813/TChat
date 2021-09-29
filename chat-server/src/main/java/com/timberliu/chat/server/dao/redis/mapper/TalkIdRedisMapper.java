package com.timberliu.chat.server.dao.redis.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.TALK_ID;

/**
 * @author liujie
 * @date 2021/9/29
 */
@Repository
public class TalkIdRedisMapper {

	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	public Long incrAndGet() {
		return stringRedisTemplate.opsForValue().increment(TALK_ID.getKeyTemplate(), 1);
	}

	public void clear() {
		stringRedisTemplate.delete(TALK_ID.getKeyTemplate());
	}

}
