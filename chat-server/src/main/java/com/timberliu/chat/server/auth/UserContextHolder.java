package com.timberliu.chat.server.auth;

/**
 * @author liujie
 * @date 2021/9/23
 */

public class UserContextHolder {

	private static final ThreadLocal<UserContext> USER_CONTEXT = new ThreadLocal<>();

	public static void setUserContext(UserContext userContext) {
		USER_CONTEXT.set(userContext);
	}

	public static UserContext getUserContext() {
		UserContext userContext = USER_CONTEXT.get();
		if (userContext == null) {
			userContext = new UserContext();
			USER_CONTEXT.set(userContext);
		}
		return userContext;
	}

	public static void clear() {
		USER_CONTEXT.remove();
	}

	public static Long getUserId() {
		UserContext userContext = USER_CONTEXT.get();
		return userContext == null ? null : userContext.getUserId();
	}

}
