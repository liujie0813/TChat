package com.timberliu.chat.server.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.timberliu.chat.server.bean.convert.GroupConvert;
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
import com.timberliu.chat.server.bean.dto.contact.GroupMemberDTO;
import com.timberliu.chat.server.dao.redis.mapper.TalkIdRedisMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.service.IContactService;
import com.timberliu.chat.server.service.IPushService;
import com.timberliu.chat.server.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
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
	public GroupDTO createGroup(CreateGroupDTO createGroupDTO) {
		existUserId(createGroupDTO.getCreateUserId());
		// 入库
		GroupDTO groupDTO = insertGroup(createGroupDTO);

		String content = JSONArray.toJSONString(createGroupDTO.getMemberIds());
		MessageStorageDTO messageStorageDTO = new MessageStorageDTO()
				.setTalkId(groupDTO.getTalkId()).setTalkType(TalkTypeEnum.GROUP.getCode()).setMsgType(MsgTypeEnum.JOIN_GROUP_NOTICE.getCode())
				.setFromId(createGroupDTO.getCreateUserId()).setContent(content);
		HistoryMsgEntity historyMsgEntity = storageService.storageMessage(messageStorageDTO);

		C2GPushRequestMessage c2gPushRequestMessage = new C2GPushRequestMessage()
				.setMsgId(historyMsgEntity.getId()).setFromId(createGroupDTO.getCreateUserId())
				.setTalkId(groupDTO.getTalkId()).setContent(content);
		pushService.pushGroupMessage(c2gPushRequestMessage);

		return groupDTO;
	}

	private GroupDTO insertGroup(CreateGroupDTO createGroupDTO) {
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

		GroupDTO groupDTO = GroupConvert.INSTANCE.convert(groupInfoEntity);
		Map<Long, List<GroupMemberDTO>> groupIdMembersMap = getGroupMembersMap(Collections.singletonList(groupDTO.getGroupId()));
		groupDTO.setMembers(groupIdMembersMap.get(groupDTO.getGroupId()));
		return groupDTO;
	}

	@Override
	public List<GroupDTO> getGroupList(Long userId) {
		List<GroupDTO> groupInfoList = groupUserRelationMapper.getGroupInfoList(userId);
		if (groupInfoList.isEmpty()) {
			return new ArrayList<>();
		}
		List<Long> groupIds = groupInfoList.stream().map(GroupDTO::getGroupId).collect(Collectors.toList());

		Map<Long, List<GroupMemberDTO>> groupIdMembersMap = getGroupMembersMap(groupIds);
		for (GroupDTO groupDTO : groupInfoList) {
			groupDTO.setMembers(groupIdMembersMap.getOrDefault(groupDTO.getGroupId(), new ArrayList<>()));
		}
		return groupInfoList;
	}

	private Map<Long, List<GroupMemberDTO>> getGroupMembersMap(List<Long> groupIds) {
		List<GroupMemberDTO> groupMemberList = groupUserRelationMapper.getGroupMemberList(groupIds);
		Map<Long, List<GroupMemberDTO>> groupIdMembersMap = new HashMap<>();
		for (GroupMemberDTO groupMemberPo : groupMemberList) {
			List<GroupMemberDTO> groupMemberPos = groupIdMembersMap.getOrDefault(groupMemberPo.getGroupId(), new ArrayList<>());
			groupMemberPos.add(groupMemberPo);
			groupIdMembersMap.put(groupMemberPo.getGroupId(), groupMemberPos);
		}
		return groupIdMembersMap;
	}

}
