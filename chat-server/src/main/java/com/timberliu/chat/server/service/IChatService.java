package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.chat.TalkDTO;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */

public interface IChatService {

	/**
	 * 获取会话列表
	 */
	List<TalkDTO> getTalkList(Long userId);

}
