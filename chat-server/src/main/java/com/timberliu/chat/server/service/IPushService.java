package com.timberliu.chat.server.service;

import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;

/**
 * @author liujie
 * @date 2021/9/28
 */

public interface IPushService {

	void pushSingleMessage(C2CPushRequestMessage c2cPushRequestMessage);

	void pushGroupMessage(C2GPushRequestMessage c2gPushRequestMessage);

}
