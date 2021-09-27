package com.timberliu.chat.server.service.impl;

import com.timberliu.chat.server.bean.convert.TalkConvert;
import com.timberliu.chat.server.bean.dto.chat.RecordDTO;
import com.timberliu.chat.server.bean.dto.chat.TalkDTO;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.dao.mysql.mapper.GroupInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.dao.mysql.po.TalkInfoPO;
import com.timberliu.chat.server.dao.mysql.po.UserFromInfoPO;
import com.timberliu.chat.server.dao.redis.mapper.OfflineMsgRedisMapper;
import com.timberliu.chat.server.dao.redis.mapper.UnreadMsgNumRedisMapper;
import com.timberliu.chat.server.service.IChatService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Service
public class ChatServiceImpl implements IChatService {

	@Resource
	private UserInfoMapper userInfoMapper;

	@Resource
	private GroupInfoMapper groupInfoMapper;

	@Resource
	private OfflineMsgRedisMapper offlineRecordRedisMapper;

	@Resource
	private UnreadMsgNumRedisMapper unreadMsgNumRedisMapper;

	@Override
	public List<TalkDTO> getTalkList(Long userId) {
		Set<Long> talkIdSet = new HashSet<>();
		Map<Long, List<HistoryMsgEntity>> singleMsgMap = new HashMap<>();
		Map<Long, List<HistoryMsgEntity>> groupMsgMap = new HashMap<>();
		// 从同步库（redis）获取消息
		Set<HistoryMsgEntity> historyMsgEntities = offlineRecordRedisMapper.get(userId);
		buildMap(historyMsgEntities, talkIdSet, singleMsgMap, groupMsgMap);

		// 基础信息
		List<TalkDTO> talkDtos = buildTalkInfo(userId, singleMsgMap.keySet(), groupMsgMap.keySet());
		// 未读数
		buildUnreadNum(talkDtos, userId, talkIdSet);
		// 消息
		Map<Long, String> fromIdFromMap = getUserMap(userId, historyMsgEntities);
		for (TalkDTO talkDto : talkDtos) {
			Long talkId = talkDto.getTalkId();
			if (talkDto.getTalkType().equals(TalkTypeEnum.SINGLE.getCode())) {
				talkDto.setRecords(buildRecordDto(fromIdFromMap, singleMsgMap.get(talkId)));
			} else if (talkDto.getTalkType().equals(TalkTypeEnum.GROUP.getCode())) {
				talkDto.setRecords(buildRecordDto(fromIdFromMap, groupMsgMap.get(talkId)));
			}
		}
		return talkDtos;
	}

	private void buildMap(Set<HistoryMsgEntity> historyMsgEntities, Set<Long> talkIdSet,
						  Map<Long, List<HistoryMsgEntity>> singleMsgMap, Map<Long, List<HistoryMsgEntity>> groupMsgMap) {
		for (HistoryMsgEntity historyMsgEntity : historyMsgEntities) {
			Long talkId = historyMsgEntity.getTalkId();
			talkIdSet.add(talkId);
			if (historyMsgEntity.getTalkType().equals(TalkTypeEnum.SINGLE.getCode())) {
				List<HistoryMsgEntity> entities = singleMsgMap.getOrDefault(talkId, new ArrayList<>());
				entities.add(historyMsgEntity);
				singleMsgMap.put(talkId, entities);
			} else if (historyMsgEntity.getTalkType().equals(TalkTypeEnum.GROUP.getCode())) {
				List<HistoryMsgEntity> entities = groupMsgMap.getOrDefault(talkId, new ArrayList<>());
				entities.add(historyMsgEntity);
				groupMsgMap.put(talkId, entities);
			}
		}
	}

	private List<TalkDTO> buildTalkInfo(Long userId, Set<Long> singleTalkIds, Set<Long> groupTalkIds) {
		// 单聊
		List<TalkInfoPO> userTalkInfos = userInfoMapper.getUserTalkInfos(userId, singleTalkIds);
		List<TalkDTO> talkDtoS = TalkConvert.INSTANCE.convert(userTalkInfos);
		// 群聊
		List<TalkInfoPO> groupTalkInfos = groupInfoMapper.getGroupTalkInfos(userId, groupTalkIds);
		talkDtoS.addAll(TalkConvert.INSTANCE.convert(groupTalkInfos));
		return talkDtoS;
	}

	private void buildUnreadNum(List<TalkDTO> talkDtos, Long userId, Collection<Long> talkIds) {
		Map<Long, Integer> talkNumMap = unreadMsgNumRedisMapper.multiGet(userId, talkIds);
		for (TalkDTO talkDto : talkDtos) {
			talkDto.setUnreadNum(talkNumMap.getOrDefault(talkDto.getTalkId(), 0));
		}
	}

	private Map<Long, String> getUserMap(Long userId, Set<HistoryMsgEntity> historyMsgEntities) {
		Set<Long> fromIds = historyMsgEntities.stream().map(HistoryMsgEntity::getFromId).collect(Collectors.toSet());

		List<UserFromInfoPO> userFromInfos = userInfoMapper.getUserFromInfos(userId, fromIds);
		Map<Long, String> resMap = new HashMap<>();
		for (UserFromInfoPO userFromInfo : userFromInfos) {
			resMap.putIfAbsent(userFromInfo.getFromId(), userFromInfo.getFrom());
		}
		return resMap;
	}

	private List<RecordDTO> buildRecordDto(Map<Long, String> fromIdFromMap, List<HistoryMsgEntity> historyMsgEntities) {
		return historyMsgEntities.stream().map(historyMsgEntity -> {
				RecordDTO recordDTO = TalkConvert.INSTANCE.convert(historyMsgEntity);
				recordDTO.setFrom(fromIdFromMap.get(recordDTO.getFromId()));
				return recordDTO;
			}).collect(Collectors.toList());
	}

}
