package com.timberliu.chat.server.interceptor;

import com.alibaba.fastjson.JSON;
import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.Constant;
import com.timberliu.chat.server.bean.dto.AccessLogCreateDTO;
import com.timberliu.chat.server.util.CommonWebUtil;
import com.timberliu.chat.server.util.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;

/**
 * @author liujie
 * @date 2021/9/28
 */
@Slf4j
public class AccessLogInterceptor extends HandlerInterceptorAdapter {

	@Value("${spring.application.name}")
	private String applicationName;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		request.setAttribute(Constant.REQUEST_ATTR_ACCESS_START_TIME, new Date());
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		AccessLogCreateDTO accessLog = new AccessLogCreateDTO();
		try {
			initAccessLog(accessLog, request);
			// 记录访问日志
			recordAccessLog(accessLog);
		} catch (Throwable th) {
			log.error("[afterCompletion] insert access log({}) error({})", JSON.toJSONString(accessLog), ExceptionUtils.getRootCauseMessage(th));
		}
	}

	private void initAccessLog(AccessLogCreateDTO accessLog, HttpServletRequest request) {
		accessLog.setUserId(CommonWebUtil.getUserId(request));
		ApiResult apiResult = CommonWebUtil.getApiResult(request);
		if (apiResult == null) {
			accessLog.setErrorCode(0).setErrorMsg("");
		} else {
			accessLog.setErrorCode(apiResult.getCode()).setErrorMsg(accessLog.getErrorMsg());
		}
		Date accessStartTime = CommonWebUtil.getAccessStartTime(request);
		accessLog.setTraceId(CommonWebUtil.getTraceId())
				.setApplicationName(applicationName)
				.setUri(request.getRequestURI())
				.setQueryString(HttpUtils.buildQueryString(request))
				.setMethod(request.getMethod())
				.setUserAgent(HttpUtils.getUserAgent(request))
				.setIp(HttpUtils.getIp(request))
				.setStartTime(accessStartTime)
				.setResponseTime((int) (System.currentTimeMillis() - accessStartTime.getTime()));

	}

	private void recordAccessLog(AccessLogCreateDTO accessLog) {
		log.info("[recordAccessLog] accessLog: {}", accessLog);
	}

}
