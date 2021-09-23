package com.timberliu.chat.server.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author liujie
 * @date 2021/9/23
 */

public class HttpUtils {

	public static String obtainAuthorization(HttpServletRequest request) {
		String authorization = request.getHeader("Authorization");
		if (StringUtils.isBlank(authorization)) {
			return null;
		}
		return authorization;
	}
}
