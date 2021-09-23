package com.timberliu.chat.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.bean.convert.UserConvert;
import com.timberliu.chat.server.bean.dto.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.UserLoginReqDTO;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.timberliu.chat.server.dao.mysql.mapper.UserInfoMapper;
import com.timberliu.chat.server.dao.redis.entity.AuthAccessTokenEntity;
import com.timberliu.chat.server.dao.redis.mapper.AuthAccessTokenRedisMapper;
import com.timberliu.chat.server.service.IUserService;
import com.timberliu.chat.server.util.DigestUtils;
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
	private AuthAccessTokenRedisMapper authAccessTokenRedisMapper;

	@Override
	public UserInfoDTO login(UserLoginReqDTO userLoginReqDTO) {
		UserInfoDTO userInfoDTO = createUserIfAbsent(userLoginReqDTO);

		return null;
	}

	private UserInfoDTO createUserIfAbsent(UserLoginReqDTO userLoginReqDTO) {
		QueryWrapper<UserInfoEntity> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", userLoginReqDTO.getAccount());
		UserInfoEntity userInfoEntity = userInfoMapper.selectOne(queryWrapper);
		if (userInfoEntity != null) {
			return UserConvert.INSTANCE.convert(userInfoEntity);
		}
		return createUser(userLoginReqDTO);
	}

	private UserInfoDTO createUser(UserLoginReqDTO userLoginReqDTO) {
		UserInfoEntity userInfoEntity = UserConvert.INSTANCE.convert(userLoginReqDTO);
		String passwordSalt = DigestUtils.genPasswordSalt();
		String password = DigestUtils.encodePassword(userInfoEntity.getPassword(), passwordSalt);
		userInfoEntity.setPassword(password);
		userInfoEntity.setPasswordSalt(passwordSalt);
		userInfoMapper.insert(userInfoEntity);
		return UserConvert.INSTANCE.convert(userInfoEntity);
	}



	@Override
	public Boolean existAccount(String account) {
		QueryWrapper<UserInfoEntity> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", account);
		Integer count = userInfoMapper.selectCount(queryWrapper);
		return count > 0;
	}

	@Override
	public AuthAccessTokenEntity getAccessToken(String accessToken) {
		return authAccessTokenRedisMapper.get(accessToken);
	}

}
