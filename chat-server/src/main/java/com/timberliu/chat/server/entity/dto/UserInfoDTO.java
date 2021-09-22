package com.timberliu.chat.server.entity.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author liujie
 * @date 2021/9/2
 */
@Getter
@Setter
@ToString
public class UserInfoDTO {

	/**
	 * token
	 */
	private String token;

	private Long userId;

	/**
	 * 用户名
	 */
	private String username;

	private String signature;

	private String account;

	private Integer sex;

	private String province;

	private String city;

	/**
	 * 头像地址
	 */
	private String avatarUrl;
}
