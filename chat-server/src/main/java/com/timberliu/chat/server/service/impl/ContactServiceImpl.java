package com.timberliu.chat.server.service.impl;

import com.timberliu.chat.server.bean.dto.ContactDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IContactService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Service
public class ContactServiceImpl implements IContactService {

	@Resource
	private UserInfoMapper userInfoMapper;

	@Resource
	private UserRelationMapper userRelationMapper;

	@Override
	public List<ContactDTO> getContactList(Long userId) {
		return userRelationMapper.getContactList(userId);
	}

	@Override
	public Boolean addContact(Long mainUserId, Long subUserId) {
		existUserId(mainUserId);
		existUserId(subUserId);
		userRelationMapper.insert(new UserRelationEntity().setMainUser(mainUserId).setSubUser(subUserId));
		userRelationMapper.insert(new UserRelationEntity().setMainUser(subUserId).setSubUser(mainUserId));
		return true;
	}

	private void existUserId(Long userId) {
		UserInfoEntity userInfoEntity = userInfoMapper.selectById(userId);
		if (userInfoEntity == null) {
			throw new BizException(ErrorCodeEnum.USER_USERID_NOT_EXIST);
		}
	}

}
