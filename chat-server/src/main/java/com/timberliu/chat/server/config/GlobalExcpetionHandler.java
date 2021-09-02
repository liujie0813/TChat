package com.timberliu.chat.server.config;

import com.timberliu.chat.server.entity.ApiResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * @author liujie
 * @date 2021/9/2
 */
@RestControllerAdvice
@Slf4j
public class GlobalExcpetionHandler {

	@ExceptionHandler(BindException.class)
	public ApiResult bindExceptionHandler(BindException ex) {
		log.warn("[handleBindException]", ex);
		FieldError fieldError = ex.getFieldError();
		assert fieldError != null;
		return ApiResult.error(400, fieldError.getDefaultMessage());
	}

	@ExceptionHandler(value = Exception.class)
	public ApiResult defaultExceptionHandler(HttpServletRequest req, Throwable ex) {
		log.error("[defaultExceptionHandler]", ex);
		return ApiResult.error(500, "系统异常");
	}
}
