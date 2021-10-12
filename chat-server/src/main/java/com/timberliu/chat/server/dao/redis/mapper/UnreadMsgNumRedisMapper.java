package com.timberliu.chat.server.dao.redis.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.UNREAD_MSG_NUM;

/**
 * @author liujie
 * @date 2021/9/27
 */
@Repository
public class UnreadMsgNumRedisMapper {

	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	public Integer get(Long userId, Long talkId) {
		String key = formatKey(userId);
		Object obj = stringRedisTemplate.opsForHash().get(key, String.valueOf(talkId));
		if (obj == null) {
			return 0;
		}
		return Integer.parseInt((String) obj);
	}

	public Map<Long, Integer> multiGet(Long userId, Set<Long> talkIds) {
		String key = formatKey(userId);
		List<Object> talkIdStrs = talkIds.stream().map(String::valueOf).collect(Collectors.toList());

		List<Object> nums = stringRedisTemplate.opsForHash().multiGet(key, talkIdStrs);
		Map<Long, Integer> res = new HashMap<>();
		int index = -1;
		for (Long talkId : talkIds) {
			if (nums.get(++index) == null) {
				continue;
			}
			res.put(talkId, Integer.parseInt((String) nums.get(index)));
		}
		return res;
	}

	public void incr(Long userId, Long talkId) {
		String key = formatKey(userId);
		stringRedisTemplate.opsForHash().increment(key, String.valueOf(talkId), 1);
	}

	public void clear(Long userId, Long talkId) {
		String key = formatKey(userId);
		stringRedisTemplate.opsForHash().delete(key, String.valueOf(talkId));
	}

	private static String formatKey(Long userId) {
		return String.format(UNREAD_MSG_NUM.getKeyTemplate(), userId);
	}

}
