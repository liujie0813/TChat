package com.timberliu.chat.server.bean;

import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
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
	private T data;

	public static <T> ApiResult<T> success() {
		return success(null);
	}

	public static <T> ApiResult<T> success(T data) {
		ApiResult<T> result = new ApiResult<>();
		result.code = 0;
		result.data = data;
		result.msg = "success";
		return result;
	}

	public static <T> ApiResult<T> error(Integer code, String message) {
		ApiResult<T> result = new ApiResult<>();
		result.code = code;
		result.msg = message;
		return result;
	}

	public static <T> ApiResult<T> error(ErrorCodeEnum errorCodeEnum) {
		return error(errorCodeEnum.getCode(), errorCodeEnum.getMsg());
	}

	public static <T> ApiResult<T> error(ErrorCodeEnum errorCodeEnum, String msg) {
		ApiResult<T> result = new ApiResult<>();
		result.code = errorCodeEnum.getCode();
		result.msg = msg;
		return result;
	}

}
