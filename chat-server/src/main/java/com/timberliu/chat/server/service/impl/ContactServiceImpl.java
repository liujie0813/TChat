package com.timberliu.chat.server.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.timberliu.chat.server.bean.convert.GroupConvert;
import com.timberliu.chat.server.bean.dto.contact.*;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.bean.enums.MsgTypeEnum;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
import com.timberliu.chat.server.dao.mysql.entity.*;
import com.timberliu.chat.server.dao.mysql.mapper.*;
import com.timberliu.chat.server.dao.redis.mapper.TalkIdRedisMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.protocol.message.c2c.ApplyRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.JoinGroupRequestMessage;
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
	private UserApplyMapper userApplyMapper;

	@Autowired
	private TalkIdRedisMapper talkIdRedisMapper;

	@Override
	public List<ApplyDTO> getApplyList(Long userId) {
		return userApplyMapper.getApplyList(userId);
	}

	@Override
	public List<ContactDTO> getContactList(Long userId) {
		return userRelationMapper.getContactList(userId);
	}

	@Override
	public Boolean applyAddContact(ApplyAddContactDTO applyAddDTO) {
		existUserId(applyAddDTO.getMainUserId());
		existUserId(applyAddDTO.getSubUserId());
		UserApplyEntity userApplyEntity = new UserApplyEntity()
				.setMainUserId(applyAddDTO.getMainUserId()).setSubUserId(applyAddDTO.getSubUserId())
				.setApplyRemark(applyAddDTO.getApplyRemark()).setApplyTime(new Date())
				.setApplyStatus(UserRelationStatusEnum.APPLY);
		userApplyMapper.insert(userApplyEntity);

		pushService.pushApplyMessage(new ApplyRequestMessage()
				.setMainUserId(applyAddDTO.getMainUserId()).setSubUserId(applyAddDTO.getSubUserId()));
		return true;
	}

	private void existUserId(Long userId) {
		UserInfoEntity userInfoEntity = userInfoMapper.selectById(userId);
		if (userInfoEntity == null) {
			throw new BizException(ErrorCodeEnum.USER_USERID_NOT_EXIST);
		}
	}

	/**
	 * mainUserId 同意 subUserId 的好友申请
	 */
	@Override
	public Boolean agreeAddContact(AgreeAddContactDTO agreeAddContactDTO) {
		Long mainUserId = agreeAddContactDTO.getMainUserId();
		Long subUserId = agreeAddContactDTO.getSubUserId();
		// 更新 subUserId 对 mainUserId 的申请状态
		userApplyMapper.updateApplyStatus(subUserId, mainUserId, UserRelationStatusEnum.ADDED);

		Long talkId = talkIdRedisMapper.incrAndGet();
		// mainUserId 对 subUserId 的备注
		userRelationMapper.insert(new UserRelationEntity().setTalkId(talkId)
				.setMainUserId(mainUserId).setSubUserId(subUserId)
				.setSubNicknameRemark(agreeAddContactDTO.getNicknameRemark()));
		userRelationMapper.insert(new UserRelationEntity().setTalkId(talkId)
				.setMainUserId(subUserId).setSubUserId(mainUserId));

		MessageStorageDTO messageStorageDTO = new MessageStorageDTO()
				.setTalkId(talkId).setTalkType(TalkTypeEnum.SINGLE.getCode())
				.setMsgType(MsgTypeEnum.CREATE_SINGLE_NOTICE.getCode())
				.setFromId(mainUserId)
				.setContent(JSONArray.toJSONString(Arrays.asList(mainUserId, subUserId)));
		HistoryMsgEntity historyMsgEntity = storageService.storageMessage(messageStorageDTO);

		C2CPushRequestMessage c2cPushRequestMessage = new C2CPushRequestMessage()
				.setMsgId(historyMsgEntity.getId()).setMsgType(MsgTypeEnum.CREATE_SINGLE_NOTICE.getCode())
				.setFromId(mainUserId).setTalkId(talkId)
				.setSendTime(historyMsgEntity.getSendTime());
		pushService.pushSingleMessage(c2cPushRequestMessage);

		return true;
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

		JoinGroupRequestMessage joinGroupRequestMessage = new JoinGroupRequestMessage()
				.setCreateUserId(createGroupDTO.getCreateUserId())
				.setMemberIds(createGroupDTO.getMemberIds()).setTalkId(historyMsgEntity.getTalkId());
		pushService.pushJoinGroupMessage(joinGroupRequestMessage);

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
