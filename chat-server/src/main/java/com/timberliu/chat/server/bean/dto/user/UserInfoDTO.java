package com.timberliu.chat.server.bean.dto.user;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/9/24
 */
@Data
@Accessors(chain = true)
public class UserInfoDTO {

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
