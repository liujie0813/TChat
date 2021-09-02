package com.timberliu.chat.server.entity;

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
public class ApiResult<T> {

	private Integer code;
	private String msg;
	private T payload;

	public static <T> ApiResult<T> success(T payload) {
		ApiResult<T> result = new ApiResult<>();
		result.code = 0;
		result.payload = payload;
		result.msg = "";
		return result;
	}

	public static <T> ApiResult<T> error(Integer code, String message) {
		ApiResult<T> result = new ApiResult<>();
		result.code = code;
		result.msg = message;
		return result;
	}
}
