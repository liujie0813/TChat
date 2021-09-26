package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.ContactDTO;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */

public interface IContactService {

	/**
	 * 添加好友
	 */
	Boolean addContact(Long mainUserId, Long subUserId);

	/**
	 * 获取好友列表
	 */
	List<ContactDTO> getContactList(Long userId);

}
