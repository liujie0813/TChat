package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;

/**
 * @author liujie
 * @date 2021/9/28
 */

public interface IStorageService {

	Boolean insertMessage(MessageStorageDTO messageStorageDTO);
}
