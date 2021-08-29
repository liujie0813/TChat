package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import io.netty.channel.ChannelHandlerContext;

/**
 * @author liujie
 * @date 2021/8/24
 */

public interface MessageHandler<T extends GenericMessage> {

    void execute(ChannelHandlerContext ctx, T message);

    GenericMessage.MessageType getType();
}
