package com.timberliu.chat.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.bean.convert.UserConvert;
import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthCreateTokenReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginRespDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IAuthService;
import com.timberliu.chat.server.service.IUserService;
import com.timberliu.chat.server.util.DigestUtils;
import org.apache.commons.lang3.StringUtils;
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

	@Resource
	private IAuthService authService;

	@Override
	public UserLoginRespDTO login(UserLoginReqDTO userLoginReqDTO, String createIp) {
		// 获取用户信息
		UserInfoEntity userInfoEntity = userInfoMapper.selectOne(
				new QueryWrapper<UserInfoEntity>().eq("account", userLoginReqDTO.getAccount()));
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
		QueryWrapper<UserInfoEntity> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", account);
		Integer count = userInfoMapper.selectCount(queryWrapper);
		return count > 0;
	}

}
