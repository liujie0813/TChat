package com.timberliu.chat.server.dao.redis.mapper;

import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import javax.annotation.Resource;

import java.util.*;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.UNREAD_MSG_NUM;

/**
 * @author liujie
 * @date 2021/9/27
 */
@Mapper
public class UnreadMsgNumRedisMapper {

	@Resource
	private RedisTemplate<String, Long> redisTemplate;

	public Integer get(Long userId, Long talkId) {
		String key = formatKey(userId);
		return redisTemplate.<Long, Integer>opsForHash().get(key, talkId);
	}

	public Map<Long, Integer> multiGet(Long userId, Collection<Long> talkIds) {
		String key = formatKey(userId);
		List<Integer> nums = redisTemplate.<Long, Integer>opsForHash().multiGet(key, talkIds);
		Map<Long, Integer> res = new HashMap<>();
		int index = 0;
		for (Long talkId : talkIds) {
			if (nums.get(index) == null) {
				continue;
			}
			res.put(talkId, nums.get(index++));
		}
		return res;
	}

	public void incr(Long userId, Long talkId) {
		String key = formatKey(userId);
		redisTemplate.opsForHash().increment(key, talkId, 1);
	}

	public void clear(Long userId, Long talkId) {
		String key = formatKey(userId);
		redisTemplate.opsForHash().put(key, talkId, 0);
	}

	private static String formatKey(Long userId) {
		return String.format(UNREAD_MSG_NUM.getKeyTemplate(), userId);
	}

}
