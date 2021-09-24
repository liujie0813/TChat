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

	public static String getIp(HttpServletRequest request) {
		// 从 X-Forwarded-For 获取
		String ip = request.getHeader("X-Forwarded-For");
		if (StringUtils.isNotBlank(ip) && !StringUtils.equalsIgnoreCase("unKnown", ip)) {
			// 多次反向代理后会有多个ip值，第一个 ip 才是真实 ip
			int index = ip.indexOf(",");
			if (index != -1) {
				return ip.substring(0, index);
			} else {
				return ip;
			}
		}
		// 从 X-Real-IP 获取
		ip = request.getHeader("X-Real-IP");
		if (StringUtils.isNotBlank(ip) && !StringUtils.equalsIgnoreCase("unKnown", ip)) {
			return ip;
		}
		// 默认
		return request.getRemoteAddr();
	}

}
