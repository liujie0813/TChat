package com.timberliu.chat.server.config;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.util.CommonWebUtil;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * @author liujie
 * @date 2021/9/28
 */
@ControllerAdvice
public class GlobalResponseBodyHandler implements ResponseBodyAdvice {

	@Override
	public boolean supports(MethodParameter methodParameter, Class aClass) {
		if (methodParameter.getMethod() == null) {
			return false;
		}
		return methodParameter.getMethod().getReturnType() == ApiResult.class;
	}

	@Override
	public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType, Class aClass,
								  ServerHttpRequest request, ServerHttpResponse serverHttpResponse) {
		CommonWebUtil.setApiResult(((ServletServerHttpRequest) request).getServletRequest(), (ApiResult) body);
		return body;
	}
}
