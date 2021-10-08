package com.timberliu.chat.server.bean.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 *
 * 全局错误码枚举
 *   0-999 系统异常保留
 *
 * 业务错误码枚举
 *   一共 6 位，分为 3 部分
 *
 *   第一段，1 位，类型
 *        1 业务级别异常
 *   第二段，2 位，模块
 *        01 登录模块
 *        02
 *   第四段，3 位，错误码
 *        一般每个模块自增
 *
 * @author liujie
 * @date 2021/9/23
 */
@Getter
@AllArgsConstructor
public enum ErrorCodeEnum {

	/**
	 * 全局错误码
	 */
	SUCCESS(0, "成功"),
	BAD_REQUEST(400, "请求参数不正确"),
	UNAUTHORIZED(401, "账号未登录"),
	NOT_FOUND(404, "请求未找到"),
	METHOD_NOT_ALLOWED(405, "请求方法不正确"),
	INTERNAL_SERVER_ERROR(500, "系统异常"),

	// 用户模块
	USER_ACCOUNT_EXIST(101001, "账号已存在"),
	USER_PASSWORD_NOT_CORRECT(101002, "密码不正确"),
	USER_USERID_NOT_EXIST(101003, "用户不存在"),
	USER_NOT_FRIENDS(101004, "不是好友关系"),
	USER_GROUP_NOT_EXIST(101005, "群组不存在"),

	// 认证模块
	AUTH_ACCESS_TOKEN_NOT_FOUND(102001, "访问令牌不存在"),
	AUTH_ACCESS_TOKEN_EXPIRED(102002, "访问令牌已过期"),
	AUTH_REFRESH_TOKEN_NOT_FOUND(102003, "刷新令牌不存在"),
	AUTH_REFRESH_TOKEN_EXPIRED(102004, "刷新令牌已过期"),
	AUTH_ACCESS_TOKEN_NOT_PASS(102005, "访问令牌未传入"),
	;

	private final Integer code;

	private final String msg;


}
