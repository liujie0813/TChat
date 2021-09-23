package com.timberliu.chat.server.bean.dto;

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

	/**
	 * 用户Id
	 */
	private Long userId;

	/**
	 * 账号
	 */
	private String account;

	/**
	 * 昵称
	 */
	private String nickname;

	/**
	 * 密码
	 */
	private String password;

	/**
	 * 头像url
	 */
	private String avatarUrl;

	/**
	 * 手机号
	 */
	private String phone;

	/**
	 * 性别
	 */
	private Integer gender;

	/**
	 * 地区-省份
	 */
	private String province;

	/**
	 * 地区-市县
	 */
	private String city;

	/**
	 * 个性签名
	 */
	private String signature;
}
