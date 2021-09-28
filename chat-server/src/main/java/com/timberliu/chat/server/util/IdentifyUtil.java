package com.timberliu.chat.server.util;

/**
 * @author Timber
 * @date 2021/9/8
 */
public class IdentifyUtil {

	private static Integer seqIdInitVal = 19972022;

	private static Integer msgIdInitVal = 19992020;

	private static Long talkId = 198419851986L;

	public static Integer nextSeqId() {
		return seqIdInitVal++;
	}

	public static Integer nextMsgId() {
		return msgIdInitVal++;
	}

	public static Long nextTalkId() {
		return talkId++;
	}

}
