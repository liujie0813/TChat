package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.UserLoginReqDTO;
import com.timberliu.chat.server.dao.redis.entity.AuthAccessTokenEntity;

/**
 * @author liujie
 * @date 2021/9/23
 */

public interface IUserService {

	/**
	 * 登录
	 *   返回携带 token
	 */
	UserInfoDTO login(UserLoginReqDTO userLoginReqDTO);

	/**
	 * 校验账号是否存在
	 */
	Boolean existAccount(String account);

	/**
	 * 获取 access_token
	 */
	AuthAccessTokenEntity getAccessToken(String accessToken);

}
