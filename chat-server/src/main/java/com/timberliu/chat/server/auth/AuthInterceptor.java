package com.timberliu.chat.server.auth;

import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.dao.redis.entity.AuthAccessTokenEntity;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.service.IUserService;
import com.timberliu.chat.server.util.HttpUtils;
import lombok.extern.slf4j.Slf4j;
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
	private IUserService userService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Long userId = obtainUserId(request);
		if (userId == null) {
			throw new BizException(ErrorCodeEnum.UNAUTHORIZED);
		}
		return true;
	}

	private Long obtainUserId(HttpServletRequest request) {
		String accessToken = HttpUtils.obtainAuthorization(request);
		if (accessToken == null) {
			return null;
		}
		AuthAccessTokenEntity authAccessTokenEntity = userService.getAccessToken(accessToken);
		Long userId = authAccessTokenEntity.getUserId();
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
