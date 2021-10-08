package com.timberliu.chat.server.service.impl;

import com.timberliu.chat.server.bean.convert.MessageConvert;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.timberliu.chat.server.dao.mysql.mapper.GroupInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.GroupUserRelationMapper;
import com.timberliu.chat.server.dao.mysql.mapper.HistoryMsgMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.dao.redis.mapper.OfflineMsgRedisMapper;
import com.timberliu.chat.server.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/28
 */
@Service
public class StorageServiceImpl implements IStorageService {

	@Autowired
	private HistoryMsgMapper historyMsgMapper;

	@Autowired
	private OfflineMsgRedisMapper offlineMsgRedisMapper;

	@Autowired
	private UserRelationMapper userRelationMapper;

	@Autowired
	private GroupUserRelationMapper groupUserRelationMapper;

	@Override
	public HistoryMsgEntity storageMessage(MessageStorageDTO messageStorageDTO) {
		HistoryMsgEntity historyMsgEntity = MessageConvert.INSTANCE.convert(messageStorageDTO);
		historyMsgEntity.setSendTime(System.currentTimeMillis());

		insertHistory(historyMsgEntity);

		insertOffline(historyMsgEntity);
		return historyMsgEntity;
	}

	private void insertHistory(HistoryMsgEntity historyMsgEntity) {
		historyMsgMapper.insert(historyMsgEntity);
	}

	/**
	 * 离线消息 写扩散
	 *    写到每个 toId 的收件箱中，包括自己
	 */
	private void insertOffline(HistoryMsgEntity historyMsgEntity) {
		List<Long> userIds = getUserIds(historyMsgEntity);
		offlineMsgRedisMapper.multiSet(userIds, historyMsgEntity);
	}

	private List<Long> getUserIds(HistoryMsgEntity historyMsgEntity) {
		if (historyMsgEntity.getTalkType().equals(TalkTypeEnum.SINGLE.getCode())) {
			UserRelationEntity userRelationEntity = userRelationMapper.getByTalkIdAndMainUserId(
					historyMsgEntity.getTalkId(), historyMsgEntity.getFromId());
			return Arrays.asList(historyMsgEntity.getFromId(), userRelationEntity.getSubUserId());
		} else {
			return groupUserRelationMapper.getByTalkId(historyMsgEntity.getTalkId());
		}
	}

}
