package com.timberliu.chat.server.util;

import cn.hutool.crypto.digest.BCrypt;

/**
 * @author liujie
 * @date 2021/9/23
 */

public class DigestUtils {

	/**
	 * 生成盐值
	 */
	public static String genPasswordSalt() {
		return BCrypt.gensalt();
	}

	/**
	 * 加密
	 */
	public static String encodePassword(String password, String salt) {
		return BCrypt.hashpw(password, salt);
	}
}
