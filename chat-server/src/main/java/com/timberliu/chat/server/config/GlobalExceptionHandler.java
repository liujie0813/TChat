package com.timberliu.chat.server.config;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * @author liujie
 * @date 2021/9/2
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	/**
	 * 处理业务异常 BizException
	 */
	@ExceptionHandler(value = BizException.class)
	public ApiResult serviceExceptionHandler(BizException ex) {
		log.info("[serviceExceptionHandler]", ex);
		return ApiResult.error(ex.getCode(), ex.getMessage());
	}

	@ExceptionHandler(value = MissingServletRequestParameterException.class)
	public ApiResult missingServletRequestParameterExceptionHandler(MissingServletRequestParameterException ex) {
		log.warn("[missingServletRequestParameterExceptionHandler]", ex);
		return ApiResult.error(ErrorCodeEnum.BAD_REQUEST, "请求参数缺失:" + ex.getParameterName());
	}

	@ExceptionHandler(BindException.class)
	public ApiResult bindExceptionHandler(BindException ex) {
		log.warn("[handleBindException]", ex);
		FieldError fieldError = ex.getFieldError();
		assert fieldError != null;
		return ApiResult.error(ErrorCodeEnum.BAD_REQUEST, fieldError.getDefaultMessage());
	}

	@ExceptionHandler(value = Exception.class)
	public ApiResult defaultExceptionHandler(HttpServletRequest req, Throwable ex) {
		log.error("[defaultExceptionHandler]", ex);
		return ApiResult.error(ErrorCodeEnum.INTERNAL_SERVER_ERROR, "系统异常");
	}

}
