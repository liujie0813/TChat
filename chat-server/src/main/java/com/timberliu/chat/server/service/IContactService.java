package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.contact.*;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */

public interface IContactService {

	/**
	 * 获取申请列表
	 */
	List<ApplyDTO> getApplyList(Long userId);

	/**
	 * 申请添加好友
	 */
	Boolean applyAddContact(ApplyAddContactDTO applyAddContactDTO);

	/**
	 * 同意添加好友
	 */
	Boolean agreeAddContact(AgreeAddContactDTO agreeAddContactDTO);

	/**
	 * 获取好友列表
	 */
	List<ContactDTO> getContactList(Long userId);

	/**
	 * 创建群组
	 */
	GroupDTO createGroup(CreateGroupDTO createGroupDTO);

	/**
	 * 获取群组列表
	 */
	List<GroupDTO> getGroupList(Long userId);

}
