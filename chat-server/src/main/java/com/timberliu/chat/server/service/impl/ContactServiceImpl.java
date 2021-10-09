package com.timberliu.chat.server.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.timberliu.chat.server.bean.dto.contact.ContactDTO;
import com.timberliu.chat.server.bean.dto.contact.CreateGroupDTO;
import com.timberliu.chat.server.bean.dto.contact.GroupDTO;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.bean.enums.MsgTypeEnum;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.*;
import com.timberliu.chat.server.dao.mysql.mapper.GroupInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.GroupUserRelationMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.dao.redis.mapper.TalkIdRedisMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GSendRequestMessage;
import com.timberliu.chat.server.service.IContactService;
import com.timberliu.chat.server.service.IPushService;
import com.timberliu.chat.server.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Service
public class ContactServiceImpl implements IContactService {

	@Autowired
	private IStorageService storageService;

	@Autowired
	private IPushService pushService;

	@Autowired
	private UserInfoMapper userInfoMapper;

	@Autowired
	private UserRelationMapper userRelationMapper;

	@Autowired
	private GroupInfoMapper groupInfoMapper;

	@Autowired
	private GroupUserRelationMapper groupUserRelationMapper;

	@Autowired
	private TalkIdRedisMapper talkIdRedisMapper;

	@Override
	public List<ContactDTO> getContactList(Long userId) {
		return userRelationMapper.getContactList(userId);
	}

	@Override
	public Boolean addContact(Long mainUserId, Long subUserId) {
		existUserId(mainUserId);
		existUserId(subUserId);
		Long talkId = talkIdRedisMapper.incrAndGet();
		userRelationMapper.insert(new UserRelationEntity()
				.setMainUserId(mainUserId).setSubUserId(subUserId).setTalkId(talkId));
		userRelationMapper.insert(new UserRelationEntity()
				.setMainUserId(subUserId).setSubUserId(mainUserId).setTalkId(talkId));
		return true;
	}

	private void existUserId(Long userId) {
		UserInfoEntity userInfoEntity = userInfoMapper.selectById(userId);
		if (userInfoEntity == null) {
			throw new BizException(ErrorCodeEnum.USER_USERID_NOT_EXIST);
		}
	}

	@Override
	public Boolean createGroup(CreateGroupDTO createGroupDTO) {
		existUserId(createGroupDTO.getCreateUserId());
		// 入库
		Long talkId = insertGroup(createGroupDTO);

		String content = JSONArray.toJSONString(createGroupDTO.getMemberIds());
		MessageStorageDTO messageStorageDTO = new MessageStorageDTO()
				.setTalkId(talkId).setTalkType(TalkTypeEnum.GROUP.getCode()).setMsgType(MsgTypeEnum.JOIN_GROUP_NOTICE.getCode())
				.setFromId(createGroupDTO.getCreateUserId()).setContent(content);
		HistoryMsgEntity historyMsgEntity = storageService.storageMessage(messageStorageDTO);

		C2GPushRequestMessage c2gPushRequestMessage = new C2GPushRequestMessage()
				.setMsgId(historyMsgEntity.getId()).setFromId(createGroupDTO.getCreateUserId())
				.setTalkId(talkId).setContent(content);
		pushService.pushGroupMessage(c2gPushRequestMessage);

		return true;
	}

	private Long insertGroup(CreateGroupDTO createGroupDTO) {
		Long talkId = talkIdRedisMapper.incrAndGet();
		GroupInfoEntity groupInfoEntity = new GroupInfoEntity()
				.setTalkId(talkId).setGroupName(createGroupDTO.getGroupName()).setCreateUserId(createGroupDTO.getCreateUserId());
		groupInfoMapper.insertAndGetGroupId(groupInfoEntity);

		Date joinTime = new Date();
		List<GroupUserRelationEntity> groupUserRelationEntities = createGroupDTO.getMemberIds().stream().map(
				userId -> new GroupUserRelationEntity().setGroupId(groupInfoEntity.getId()).setUserId(userId).setJoinTime(joinTime)
		).collect(Collectors.toList());
		groupUserRelationEntities.add(new GroupUserRelationEntity()
				.setGroupId(groupInfoEntity.getId()).setUserId(createGroupDTO.getCreateUserId()).setJoinTime(joinTime));
		groupUserRelationMapper.batchInsert(groupUserRelationEntities);
		return talkId;
	}

	@Override
	public List<GroupDTO> getGroupList(Long userId) {
		return groupUserRelationMapper.getGroupList(userId);
	}

}
