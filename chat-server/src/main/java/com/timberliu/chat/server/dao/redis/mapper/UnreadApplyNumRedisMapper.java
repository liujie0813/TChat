package com.timberliu.chat.server.dao.redis.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.UNREAD_APPLY_NUM;
import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.UNREAD_MSG_NUM;

/**
 * @author liujie
 * @date 2021/9/27
 */
@Repository
public class UnreadApplyNumRedisMapper {

	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	public Integer get(Long userId) {
		String key = formatKey(userId);
		String obj = stringRedisTemplate.opsForValue().get(key);
		if (obj == null) {
			return 0;
		}
		return Integer.parseInt(obj);
	}

	public void incr(Long userId) {
		String key = formatKey(userId);
		stringRedisTemplate.opsForValue().increment(key, 1);
	}

	public void clear(Long userId) {
		String key = formatKey(userId);
		stringRedisTemplate.delete(key);
	}

	private static String formatKey(Long userId) {
		return String.format(UNREAD_APPLY_NUM.getKeyTemplate(), userId);
	}

}
