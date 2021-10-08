package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;

/**
 * @author liujie
 * @date 2021/9/28
 */

public interface IStorageService {

	/**
	 * 存储历史消息和离线消息
	 */
	HistoryMsgEntity storageMessage(MessageStorageDTO messageStorageDTO);
}
