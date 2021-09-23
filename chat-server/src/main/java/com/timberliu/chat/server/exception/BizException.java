package com.timberliu.chat.server.exception;

import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 业务异常
 *
 * @author liujie
 * @date 2021/9/23
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class BizException extends RuntimeException {

	private Integer code;

	private String msg;

	public BizException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMsg(), null);
		this.code = errorCodeEnum.getCode();
		this.msg = errorCodeEnum.getMsg();
	}

	public BizException(ErrorCodeEnum errorCodeEnum, String msg) {
		super(msg, null);
		this.code = errorCodeEnum.getCode();
		this.msg = msg;
	}

}
