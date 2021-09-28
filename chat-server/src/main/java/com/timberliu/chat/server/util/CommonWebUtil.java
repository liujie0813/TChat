package com.timberliu.chat.server.util;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.Constant;

import javax.servlet.ServletRequest;
import java.util.Date;
import java.util.UUID;

/**
 * @author liujie
 * @date 2021/9/28
 */

public class CommonWebUtil {

	public static String getTraceId() {
		return UUID.randomUUID().toString();
	}

	public static Long getUserId(ServletRequest request) {
		return (Long) request.getAttribute(Constant.REQUEST_ATTR_USER_ID_KEY);
	}

	public static void setUserId(ServletRequest request, Long userId) {
		request.setAttribute(Constant.REQUEST_ATTR_USER_ID_KEY, userId);
	}

	public static ApiResult getApiResult(ServletRequest request) {
		return (ApiResult) request.getAttribute(Constant.REQUEST_ATTR_API_RESULT);
	}

	public static void setApiResult(ServletRequest request, ApiResult result) {
		request.setAttribute(Constant.REQUEST_ATTR_API_RESULT, result);
	}

	public static void setAccessStartTime(ServletRequest request, Date startTime) {
		request.setAttribute(Constant.REQUEST_ATTR_ACCESS_START_TIME, startTime);
	}

	public static Date getAccessStartTime(ServletRequest request) {
		return (Date) request.getAttribute(Constant.REQUEST_ATTR_ACCESS_START_TIME);
	}

}
