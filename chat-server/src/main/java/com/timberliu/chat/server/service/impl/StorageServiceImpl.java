package com.timberliu.chat.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.bean.convert.MessageConvert;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.timberliu.chat.server.dao.mysql.mapper.GroupInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.HistoryMsgMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.dao.redis.mapper.OfflineMsgRedisMapper;
import com.timberliu.chat.server.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author liujie
 * @date 2021/9/28
 */
@Service
public class StorageServiceImpl implements IStorageService {

	@Resource
	private HistoryMsgMapper historyMsgMapper;

	@Resource
	private OfflineMsgRedisMapper offlineMsgRedisMapper;

	@Resource
	private UserRelationMapper userRelationMapper;

	@Resource
	private GroupInfoMapper groupInfoMapper;

	@Override
	public Boolean insertMessage(MessageStorageDTO messageStorageDTO) {
		insertHistory(messageStorageDTO);
		insertOffline(messageStorageDTO);
		return true;
	}

	private void insertHistory(MessageStorageDTO messageStorageDTO) {
		HistoryMsgEntity historyMsgEntity = MessageConvert.INSTANCE.convert(messageStorageDTO);
		historyMsgEntity.setTalkId(getTalkId(messageStorageDTO));
		historyMsgMapper.insert(historyMsgEntity);
	}

	private Long getTalkId(MessageStorageDTO messageStorageDTO) {
		if (messageStorageDTO.getTalkType().equals(TalkTypeEnum.SINGLE.getCode())) {
			return userRelationMapper.getByUserId(messageStorageDTO.getFromId(), messageStorageDTO.getToId()).getTalkId();
		} else {
			return groupInfoMapper.getByGroupId(messageStorageDTO.getToId()).getTalkId();
		}
	}

	private void insertOffline(MessageStorageDTO messageStorageDTO) {

	}

}
