package com.timberliu.chat.server.auth;

import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IAuthService;
import com.timberliu.chat.server.util.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

	@Resource
	private IAuthService authService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Long userId = obtainUserId(request);
		if (!((HandlerMethod) handler).hasMethodAnnotation(NotRequireAuth.class) && userId == null) {
			// 需要登录认证，且没有 userId
			throw new BizException(ErrorCodeEnum.UNAUTHORIZED);
		}
		return true;
	}

	private Long obtainUserId(HttpServletRequest request) {
		String accessToken = HttpUtils.obtainAuthorization(request);
		if (accessToken == null) {
			return null;
		}
		AuthAccessTokenRespDTO authAccessTokenRespDTO = authService.checkAccessToken(accessToken);
		Long userId = authAccessTokenRespDTO.getUserId();
		UserContext userContext = new UserContext();
		userContext.setUserId(userId);
		UserContextHolder.setUserContext(userContext);
		return userId;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		UserContextHolder.clear();
	}
}
