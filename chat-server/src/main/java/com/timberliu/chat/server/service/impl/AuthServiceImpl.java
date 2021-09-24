package com.timberliu.chat.server.service.impl;

import cn.hutool.core.lang.UUID;
import com.timberliu.chat.server.bean.convert.AuthConvert;
import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthCreateTokenReqDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthRefreshTokenReqDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import com.timberliu.chat.server.dao.mysql.entity.AuthRefreshTokenEntity;
import com.timberliu.chat.server.dao.mysql.mapper.AuthAccessTokenMapper;
import com.timberliu.chat.server.dao.mysql.mapper.AuthRefreshTokenMapper;
import com.timberliu.chat.server.dao.redis.mapper.AuthAccessTokenRedisMapper;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IAuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author Timber
 * @date 2021/9/23
 */
@Service
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

	/**
	 * 登录时生成 access_token 和 refresh_token，并返回
	 */
	@Override
	public AuthAccessTokenRespDTO createAccessToken(AuthCreateTokenReqDTO authCreateTokenReqDTO) {
		// 创建刷新令牌和访问令牌（两者关联）
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

	/**
	 * access_token 失效时，使用 refresh_token 请求，生成新的 access_token
	 * refresh_token 失效时，重新登录
	 */
	@Override
	public AuthAccessTokenRespDTO refreshAccessToken(AuthRefreshTokenReqDTO authRefreshTokenReqDTO) {
		AuthRefreshTokenEntity authRefreshTokenEntity = authRefreshTokenMapper.selectByRefreshToken(authRefreshTokenReqDTO.getRefreshToken());
		if (authRefreshTokenEntity == null) {
			throw new BizException(ErrorCodeEnum.AUTH_REFRESH_TOKEN_NOT_FOUND);
		}
		if (authRefreshTokenEntity.getExpireTime().getTime() < System.currentTimeMillis()) {
			throw new BizException(ErrorCodeEnum.AUTH_REFRESH_TOKEN_EXPIRED);
		}

		// 通过刷新令牌，删除旧的访问令牌，并创建新的访问令牌返回
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
