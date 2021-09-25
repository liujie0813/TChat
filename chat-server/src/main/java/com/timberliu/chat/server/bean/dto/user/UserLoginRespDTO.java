package com.timberliu.chat.server.bean.dto.user;

import lombok.*;

import java.util.Date;

/**
 * @author liujie
 * @date 2021/9/2
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRespDTO {

	/**
	 * 访问令牌
	 */
	private String accessToken;

	/**
	 * 刷新令牌
	 */
	private String refreshToken;

	/**
	 * 过期时间
	 */
	private Date expireTime;

	/**
	 * 用户信息
	 */
	private UserInfoDTO userInfoDTO;

}
