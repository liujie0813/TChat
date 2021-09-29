package com.timberliu.chat.server.mapper;

import com.timberliu.chat.server.ChatServerApplicationTests;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.dao.redis.mapper.OfflineMsgRedisMapper;
import com.timberliu.chat.server.dao.redis.mapper.UnreadMsgNumRedisMapper;
import org.junit.Test;
import org.mockito.internal.util.collections.Sets;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author liujie
 * @date 2021/9/28
 */

public class RedisMapperTest extends ChatServerApplicationTests {

	@Autowired
	private OfflineMsgRedisMapper offlineMsgRedisMapper;

	@Autowired
	private UnreadMsgNumRedisMapper unreadMsgNumRedisMapper;

	@Test
	public void testOfflineMsg() {
		HistoryMsgEntity historyMsgEntity = new HistoryMsgEntity().setId(19842025L)
						.setTalkId(198419851987L).setTalkType(0).setMsgType(0)
						.setFromId(1L).setContent("hello").setSendTime(1632812534000L);
		offlineMsgRedisMapper.set(1L, historyMsgEntity);

		List<HistoryMsgEntity> historyMsgEntities = offlineMsgRedisMapper.get(1L);
		System.out.println(historyMsgEntities);
	}

	@Test
	public void testGetOfflineMsg() {
		unreadMsgNumRedisMapper.incr(1L, 198419851987L);

		Integer num = unreadMsgNumRedisMapper.get(1L, 198419851987L);
		System.out.println(num);

		Map<Long, Integer> longIntegerMap = unreadMsgNumRedisMapper.multiGet(1L, Sets.newSet(198419851987L));
		for (Map.Entry<Long, Integer> longIntegerEntry : longIntegerMap.entrySet()) {
			System.out.println(longIntegerEntry.getKey() + "-" + longIntegerEntry.getValue());
		}
	}

}
