package com.timberliu.chat.server.dispatcher;

import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.protocol.handler.MessageHandler;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import com.timberliu.chat.server.protocol.message.GenericeMessage;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Slf4j
@Component
@ChannelHandler.Sharable
public class MessageDispatcher extends SimpleChannelInboundHandler<AbstractMessage> implements InitializingBean {

    private final Map<Byte, MessageHandler<AbstractMessage>> handlers = new HashMap<>();

    private final ExecutorService handlerExecutor = Executors.newFixedThreadPool(200);

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, AbstractMessage message) throws Exception {
        log.info("[MessageDispatcher] recv msg: {}", message);
        byte command = message.getCommand();
        // 根据 message_type 获取 messageHandler 并调用
        MessageHandler<AbstractMessage> messageHandler = handlers.get(command);
        if (messageHandler == null) {
            channelHandlerContext.channel().writeAndFlush(
                    new GenericeMessage(ErrorCodeEnum.NETTY_MESSAGE_TYPE_NOT_EXIST));
        }
        handlerExecutor.execute(() -> {
            messageHandler.execute(channelHandlerContext.channel(), message);
        });
    }

    @Resource
    private ApplicationContext applicationContext;

    @Override
    @SuppressWarnings("unchecked")
    public void afterPropertiesSet() throws Exception {
        // 加载所有 MessageHandler
        applicationContext.getBeansOfType(MessageHandler.class).values().forEach(messageHandler -> {
            handlers.put(messageHandler.getType(), (MessageHandler<AbstractMessage>) messageHandler);
        });
        log.info("[afterPropertiesSet] message handler size: {}", handlers.size());
    }

}
