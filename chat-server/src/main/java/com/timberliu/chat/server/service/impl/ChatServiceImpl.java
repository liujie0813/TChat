package com.timberliu.chat.server.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.timberliu.chat.server.bean.dto.chat.GetTalkReqDTO;
import com.timberliu.chat.server.bean.dto.chat.TalkDTO;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgSingleEntity;
import com.timberliu.chat.server.dao.mysql.mapper.HistoryMsgGroupMapper;
import com.timberliu.chat.server.dao.mysql.mapper.HistoryMsgSingleMapper;
import com.timberliu.chat.server.service.IChatService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Service
public class ChatServiceImpl implements IChatService {

	@Resource
	private HistoryMsgSingleMapper historyMsgSingleMapper;

	@Resource
	private HistoryMsgGroupMapper historyMsgGroupMapper;

	@Override
	public IPage<TalkDTO> getTalks(GetTalkReqDTO talkReqDTO) {
		Page<HistoryMsgSingleEntity> msgSingleEntityPage = new Page<>(talkReqDTO.getPageNum(), talkReqDTO.getPageSize());
		IPage<HistoryMsgSingleEntity> msgSingleEntityIPage = historyMsgSingleMapper.selectPageByUserId(
				msgSingleEntityPage, talkReqDTO.getUserId());


		return null;
	}



}
