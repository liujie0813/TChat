package com.timberliu.chat.server.dao.redis.mapper;

import com.alibaba.fastjson.JSON;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.CHAT_RECORD;

/**
 * 消息同步（离线消息）
 *
 * @author liujie
 * @date 2021/9/27
 */
@Repository
public class OfflineMsgRedisMapper {

	@Resource
	private RedisTemplate<String, HistoryMsgEntity> chatRecordRedisTemplate;

	public Set<HistoryMsgEntity> get(Long userId) {
		String key = formatKey(userId);
		return chatRecordRedisTemplate.opsForZSet().range(key, 0, -1);
	}

	public void set(Long userId, HistoryMsgEntity historyMsgEntity) {
		String key = formatKey(userId);
		chatRecordRedisTemplate.opsForZSet().add(key, historyMsgEntity, historyMsgEntity.getId());
	}

	public void set(List<Long> userIds, HistoryMsgEntity historyMsgEntity) {
		chatRecordRedisTemplate.executePipelined((RedisCallback<HistoryMsgEntity>) connection -> {
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
