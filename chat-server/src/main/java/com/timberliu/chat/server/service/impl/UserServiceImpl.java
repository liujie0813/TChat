package com.timberliu.chat.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.bean.convert.UserConvert;
import com.timberliu.chat.server.bean.dto.SearchAccountRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthCreateTokenReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginRespDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
import com.timberliu.chat.server.dao.mysql.entity.UserApplyEntity;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.timberliu.chat.server.dao.mysql.mapper.UserApplyMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.dao.mysql.mapper.UserRelationMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IAuthService;
import com.timberliu.chat.server.service.IUserService;
import com.timberliu.chat.server.util.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Service
public class UserServiceImpl implements IUserService {

	@Resource
	private UserInfoMapper userInfoMapper;

	@Autowired
	private UserApplyMapper userApplyMapper;

	@Autowired
	private UserRelationMapper userRelationMapper;

	@Resource
	private IAuthService authService;

	@Override
	public UserLoginRespDTO login(UserLoginReqDTO userLoginReqDTO, String createIp) {
		// 获取用户信息
		UserInfoEntity userInfoEntity = userInfoMapper.searchByAccount(userLoginReqDTO.getAccount());
		if (userInfoEntity == null) {
			// 如果账号不存在，则创建
			userInfoEntity = createUser(userLoginReqDTO);
		} else {
			// 否则，校验密码
			verifyPassword(userLoginReqDTO, userInfoEntity);
		}
		// 创建访问令牌
		AuthAccessTokenRespDTO accessTokenRespDTO = authService.createAccessToken(
				new AuthCreateTokenReqDTO().setUserId(userInfoEntity.getId()).setCreateIp(createIp));
		UserLoginRespDTO userLoginRespDTO = UserConvert.INSTANCE.convert(accessTokenRespDTO);
		UserInfoDTO userInfoDTO = UserConvert.INSTANCE.convert(userInfoEntity);
		userLoginRespDTO.setUserInfoDTO(userInfoDTO);
		return userLoginRespDTO;
	}

	private void verifyPassword(UserLoginReqDTO userLoginReqDTO, UserInfoEntity userInfoEntity) {
		String encodePassword = DigestUtils.encodePassword(userLoginReqDTO.getPassword(), userInfoEntity.getPasswordSalt());
		if (!StringUtils.equals(userInfoEntity.getPassword(), encodePassword)) {
			throw new BizException(ErrorCodeEnum.USER_PASSWORD_NOT_CORRECT);
		}
	}

	private UserInfoEntity createUser(UserLoginReqDTO userLoginReqDTO) {
		UserInfoEntity userInfoEntity = UserConvert.INSTANCE.convert(userLoginReqDTO);
		String passwordSalt = DigestUtils.genPasswordSalt();
		String password = DigestUtils.encodePassword(userInfoEntity.getPassword(), passwordSalt);
		userInfoEntity.setNickname(userLoginReqDTO.getAccount());
		userInfoEntity.setPassword(password);
		userInfoEntity.setPasswordSalt(passwordSalt);
		userInfoMapper.insert(userInfoEntity);
		return userInfoEntity;
	}

	@Override
	public Boolean existAccount(String account) {
		return userInfoMapper.searchByAccount(account) != null;
	}

	@Override
	public SearchAccountRespDTO searchByAccount(Long userId, String account) {
		UserInfoEntity userInfoEntity = userInfoMapper.searchByAccount(account);
		if (userInfoEntity == null) {
			throw new BizException(ErrorCodeEnum.USER_ACCOUNT_NOT_EXIST);
		}
		SearchAccountRespDTO searchAccountRespDTO = UserConvert.INSTANCE.convertSearch(userInfoEntity);

		// 是否为好友
		UserRelationEntity userRelationEntity = userRelationMapper.getByBothUserId(userId, userInfoEntity.getId());
		if (userRelationEntity != null) {
			searchAccountRespDTO.setRelationStatus(UserRelationStatusEnum.ADDED);
		} else {
			// 是否申请
			UserApplyEntity userApplyEntity = userApplyMapper.getByBothUserId(userId, userInfoEntity.getId());
			if (userApplyEntity == null || userApplyEntity.getApplyStatus().equals(UserRelationStatusEnum.OVERDUE)) {
				searchAccountRespDTO.setRelationStatus(UserRelationStatusEnum.UN_APPLY);
			} else {
				searchAccountRespDTO.setRelationStatus(userApplyEntity.getApplyStatus());
			}
		}

		return searchAccountRespDTO;
	}

}
