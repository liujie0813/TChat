package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.contact.ContactDTO;
import com.timberliu.chat.server.bean.dto.contact.CreateGroupDTO;
import com.timberliu.chat.server.bean.dto.contact.GroupDTO;

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

	/**
	 * 创建群组
	 */
	Boolean createGroup(CreateGroupDTO createGroupDTO);

	/**
	 * 获取群组列表
	 */
	List<GroupDTO> getGroupList(Long userId);

}
