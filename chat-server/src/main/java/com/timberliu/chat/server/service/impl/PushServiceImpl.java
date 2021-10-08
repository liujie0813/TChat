package com.timberliu.chat.server.service.impl;

import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.timberliu.chat.server.dao.mysql.mapper.GroupUserRelationMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.dao.redis.mapper.UnreadMsgNumRedisMapper;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.server.NettyChannelManager;
import com.timberliu.chat.server.service.IPushService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author liujie
 * @date 2021/9/28
 */
@Service
@Slf4j
public class PushServiceImpl implements IPushService {

	@Autowired
	private NettyChannelManager nettyChannelManager;

	@Autowired
	private UserRelationMapper userRelationMapper;

	@Autowired
	private GroupUserRelationMapper groupUserRelationMapper;

	@Autowired
	private UnreadMsgNumRedisMapper unreadMsgNumRedisMapper;

	@Override
	public void pushSingleMessage(C2CPushRequestMessage c2cPushRequestMessage) {
		UserRelationEntity userRelationEntity = userRelationMapper.getByTalkIdAndMainUserId(
				c2cPushRequestMessage.getTalkId(), c2cPushRequestMessage.getFromId());
		Long userId = userRelationEntity.getSubUserId();
		if (nettyChannelManager.online(userId)) {
			nettyChannelManager.send(userRelationEntity.getSubUserId(), c2cPushRequestMessage);
		} else {
			log.info("[pushSingleMessage] userId({}) offline", userId);
			unreadMsgNumRedisMapper.incr(userId, c2cPushRequestMessage.getTalkId());
		}
	}

	@Override
	public void pushGroupMessage(C2GPushRequestMessage c2gPushRequestMessage) {
		List<Long> userIds = groupUserRelationMapper.getByTalkId(c2gPushRequestMessage.getTalkId())
				.stream().filter(userId -> !userId.equals(c2gPushRequestMessage.getFromId())).collect(Collectors.toList());
		for (Long userId : userIds) {
			if (!nettyChannelManager.online(userId)) {
				continue;
			}
			nettyChannelManager.send(userId, c2gPushRequestMessage);
		}
	}

}
