package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.protocol.message.AbstractMessage;
import io.netty.channel.Channel;

/**
 * @author liujie
 * @date 2021/8/24
 */

public interface MessageHandler<T extends AbstractMessage> {

    void execute(Channel channel, T message);

    byte getType();
}
