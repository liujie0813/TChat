package com.timberliu.chat.server.codec;

import com.timberliu.chat.server.exception.InvalidProtocolException;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToMessageCodec;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author liujie
 * @date 2021/8/26
 */
@Slf4j
@Component
@ChannelHandler.Sharable
public class MessageCodecHandler extends MessageToMessageCodec<ByteBuf, AbstractMessage> {

    @Resource
    private MessageCodec messageCodec;

    @Override
    protected void encode(ChannelHandlerContext ctx, AbstractMessage msg, List<Object> out) throws Exception {
        ByteBuf byteBuf = ctx.channel().alloc().ioBuffer();
        messageCodec.encode(msg, byteBuf);
        out.add(byteBuf);
    }

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf byteBuf, List<Object> out) throws Exception {
        AbstractMessage message;
        try {
            message = messageCodec.decode(byteBuf);
        } catch (InvalidProtocolException e) {
            log.error("[decode] invalid protocol format", e);
            ctx.channel().close();
            return;
        }
        out.add(message);
    }
}
