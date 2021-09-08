package com.timberliu.chat.server.util;

/**
 * @author Timber
 * @date 2021/9/8
 */
public class Util {

	private static Integer msgIdInitVal = 19972022;

	public static Integer nextSeqId() {
		return msgIdInitVal++;
	}
}
