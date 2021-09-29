package com.timberliu.chat.server.dao.redis.mapper;

import com.alibaba.fastjson.JSON;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.CHAT_RECORD;

/**
 * 消息同步（离线消息）
 *
 * @author liujie
 * @date 2021/9/27
 */
@Repository
public class OfflineMsgRedisMapper {

	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	public List<HistoryMsgEntity> get(Long userId) {
		String key = formatKey(userId);
		Set<String> set = stringRedisTemplate.opsForZSet().rangeByScore(key, 0, Double.MAX_VALUE);
		List<HistoryMsgEntity> res = new ArrayList<>();
		if (set != null) {
			for (String str : set) {
				res.add(JSON.parseObject(str, HistoryMsgEntity.class));
			}
		}
		return res;
	}

	public void set(Long userId, HistoryMsgEntity historyMsgEntity) {
		String key = formatKey(userId);
		String str = JSON.toJSONString(historyMsgEntity);
		stringRedisTemplate.opsForZSet().add(key, str, historyMsgEntity.getId());
	}

	public void set(List<Long> userIds, HistoryMsgEntity historyMsgEntity) {
		stringRedisTemplate.executePipelined((RedisCallback<HistoryMsgEntity>) connection -> {
			for (Long userId : userIds) {
				String key = formatKey(userId);
				connection.zAdd(key.getBytes(StandardCharsets.UTF_8), historyMsgEntity.getId(),
						JSON.toJSONString(historyMsgEntity).getBytes(StandardCharsets.UTF_8));
			}
			return null;
		});
	}

	private static String formatKey(Long userId) {
		return String.format(CHAT_RECORD.getKeyTemplate(), userId);
	}

}
