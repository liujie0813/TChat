package com.timberliu.chat.server.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.timberliu.chat.server.bean.dto.chat.GetTalkReqDTO;
import com.timberliu.chat.server.bean.dto.chat.TalkDTO;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */

public interface IChatService {

	/**
	 * 获取所有会话及其最近 100 条消息
	 */
	IPage<TalkDTO> getTalks(GetTalkReqDTO talkReqDTO);
}
