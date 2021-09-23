package com.timberliu.chat.server.service.impl;

import cn.hutool.core.lang.UUID;
import com.timberliu.chat.server.bean.convert.AuthConvert;
import com.timberliu.chat.server.bean.dto.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.AuthCreateTokenReqDTO;
import com.timberliu.chat.server.bean.dto.AuthRefreshTokenReqDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import com.timberliu.chat.server.dao.mysql.entity.AuthRefreshTokenEntity;
import com.timberliu.chat.server.dao.mysql.mapper.AuthAccessTokenMapper;
import com.timberliu.chat.server.dao.mysql.mapper.AuthRefreshTokenMapper;
import com.timberliu.chat.server.dao.redis.mapper.AuthAccessTokenRedisMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IAuthService;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author Timber
 * @date 2021/9/23
 */
public class AuthServiceImpl implements IAuthService {

	@Value("${auth.expire-times.access-token}")
	private Long authAccessTokenExpireTimes;

	@Value("${auth.expire-times.refresh-token}")
	private Long authRefreshTokenExpireTimes;

	@Resource
	private AuthAccessTokenMapper authAccessTokenMapper;

	@Resource
	private AuthRefreshTokenMapper authRefreshTokenMapper;

	@Resource
	private AuthAccessTokenRedisMapper authAccessTokenRedisMapper;

	@Override
	public AuthAccessTokenRespDTO createAccessToken(AuthCreateTokenReqDTO authCreateTokenReqDTO) {
		// 创建刷新令牌和访问令牌
		AuthRefreshTokenEntity authRefreshToken = createAuthRefreshToken(authCreateTokenReqDTO.getUserId(), authCreateTokenReqDTO.getCreateIp());
		AuthAccessTokenEntity authAccessToken = createAuthAccessToken(authRefreshToken, authCreateTokenReqDTO.getCreateIp());
		return AuthConvert.INSTANCE.convert(authAccessToken);
	}

	@Override
	public AuthAccessTokenRespDTO checkAccessToken(String accessToken) {
		AuthAccessTokenEntity authAccessTokenEntity = this.getAuthAccessToken(accessToken);
		// token 不存在
		if (authAccessTokenEntity == null) {
			throw new BizException(ErrorCodeEnum.AUTH_ACCESS_TOKEN_NOT_FOUND);
		}
		// token 已过期
		if (authAccessTokenEntity.getExpireTime().getTime() < System.currentTimeMillis()) {
			throw new BizException(ErrorCodeEnum.AUTH_ACCESS_TOKEN_EXPIRED);
		}
		return AuthConvert.INSTANCE.convert(authAccessTokenEntity);
	}

	@Override
	public AuthAccessTokenRespDTO refreshAccessToken(AuthRefreshTokenReqDTO authRefreshTokenReqDTO) {
		AuthRefreshTokenEntity authRefreshTokenEntity = authRefreshTokenMapper.selectByRefreshToken(authRefreshTokenReqDTO.getRefreshToken());
		if (authRefreshTokenEntity == null) {
			throw new BizException(ErrorCodeEnum.AUTH_REFRESH_TOKEN_NOT_FOUND);
		}
		if (authRefreshTokenEntity.getExpireTime().getTime() < System.currentTimeMillis()) {
			throw new BizException(ErrorCodeEnum.AUTH_REFRESH_TOKEN_EXPIRED);
		}

		List<AuthAccessTokenEntity> authAccessTokenEntities = authAccessTokenMapper.selectListByRefreshToken(authRefreshTokenEntity.getRefreshToken());
		authAccessTokenEntities.forEach(authAccessTokenEntity -> {
			authAccessTokenMapper.deleteById(authAccessTokenEntity.getId());
			authAccessTokenRedisMapper.delete(authAccessTokenEntity.getAccessToken());
		});
		AuthAccessTokenEntity authAccessTokenEntity = createAuthAccessToken(authRefreshTokenEntity, authRefreshTokenEntity.getCreateIp());
		return AuthConvert.INSTANCE.convert(authAccessTokenEntity);
	}

	@Override
	public void removeAccessToken(Long userId) {
		AuthAccessTokenEntity authAccessTokenEntity = authAccessTokenMapper.selectByUserId(userId);
		if (authAccessTokenEntity != null) {
			authAccessTokenMapper.deleteById(authAccessTokenEntity.getId());
			authAccessTokenRedisMapper.delete(authAccessTokenEntity.getAccessToken());
		}
		authRefreshTokenMapper.deleteByUserId(userId);
	}

	private AuthRefreshTokenEntity createAuthRefreshToken(Long userId, String createIp) {
		AuthRefreshTokenEntity authRefreshTokenEntity = new AuthRefreshTokenEntity()
				.setUserId(userId)
				.setRefreshToken(generateRefreshToken())
				.setExpireTime(new Date(System.currentTimeMillis() + authRefreshTokenExpireTimes * 60 * 1000))
				.setCreateIp(createIp);
		authRefreshTokenMapper.insert(authRefreshTokenEntity);
		return authRefreshTokenEntity;
	}

	private AuthAccessTokenEntity createAuthAccessToken(AuthRefreshTokenEntity refreshTokenEntity, String createIp) {
		AuthAccessTokenEntity authAccessTokenEntity = new AuthAccessTokenEntity()
				.setUserId(refreshTokenEntity.getUserId())
				.setAccessToken(generateAccessToken())
				.setRefreshToken(refreshTokenEntity.getRefreshToken())
				.setExpireTime(new Date(System.currentTimeMillis() + authAccessTokenExpireTimes * 60 * 1000))
				.setCreateIp(createIp);
		authAccessTokenMapper.insert(authAccessTokenEntity);
		return authAccessTokenEntity;
	}

	private AuthAccessTokenEntity getAuthAccessToken(String accessToken) {
		// 优先从 Redis 获取
		AuthAccessTokenEntity authAccessTokenEntity = authAccessTokenRedisMapper.get(accessToken);
		if (authAccessTokenEntity != null) {
			return authAccessTokenEntity;
		}
		// 从 MySQL 获取，再写到 Redis 中
		authAccessTokenEntity = authAccessTokenMapper.selectByAccessToken(accessToken);
		if (authAccessTokenEntity != null) {
			authAccessTokenRedisMapper.set(authAccessTokenEntity);
		}
		return authAccessTokenEntity;
	}

	private static String generateAccessToken() {
		return UUID.fastUUID().toString(true);
	}

	private static String generateRefreshToken() {
		return UUID.fastUUID().toString(true);
	}

}
