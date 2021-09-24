package com.timberliu.chat.server.service;

import com.timberliu.chat.server.bean.dto.user.UserLoginReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginRespDTO;

/**
 * @author liujie
 * @date 2021/9/23
 */

public interface IUserService {

	/**
	 * 登录
	 *   返回携带 token
	 */
	UserLoginRespDTO login(UserLoginReqDTO userLoginReqDTO, String createIp);

	/**
	 * 校验账号是否存在
	 */
	Boolean existAccount(String account);

}
