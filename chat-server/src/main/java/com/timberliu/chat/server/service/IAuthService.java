package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.AuthCreateTokenReqDTO;
import com.timberliu.chat.server.bean.dto.AuthRefreshTokenReqDTO;

/**
 * @author Timber
 * @date 2021/9/23
 */
public interface IAuthService {

	/**
	 * 创建令牌
	 */
	AuthAccessTokenRespDTO createAccessToken(AuthCreateTokenReqDTO authCreateTokenReqDTO);

	/**
	 * 检查令牌
	 */
	AuthAccessTokenRespDTO checkAccessToken(String accessToken);

	/**
	 * 刷新令牌
	 */
	AuthAccessTokenRespDTO refreshAccessToken(AuthRefreshTokenReqDTO authRefreshTokenReqDTO);

	/**
	 * 删除令牌
	 */
	void removeAccessToken(Long userId);

}
