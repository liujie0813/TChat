//package com.timberliu.chat.server.dispatcher;
//
//import com.timberliu.chat.server.message.protobuf.ProtobufMessage;
//import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
//import com.timberliu.chat.server.protocol.handler.MessageHandler;
//import io.netty.channel.ChannelHandler;
//import io.netty.channel.ChannelHandlerContext;
//import io.netty.channel.SimpleChannelInboundHandler;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.InitializingBean;
//import org.springframework.context.ApplicationContext;
//
//import javax.annotation.Resource;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//
///**
// * @author liujie
// * @date 2021/8/24
// */
//@Slf4j
//@ChannelHandler.Sharable
//public class MessageDispatcher_Bak extends SimpleChannelInboundHandler<ProtobufMessage.GenericMessage> implements InitializingBean {
//
//    private final Map<GenericMessage.MessageType, MessageHandler<GenericMessage>> handlers = new HashMap<>();
//
//    private final ExecutorService handlerExecutor = Executors.newFixedThreadPool(200);
//
//    @Override
//    protected void channelRead0(ChannelHandlerContext channelHandlerContext, ProtobufMessage.GenericMessage message) throws Exception {
//        GenericMessage.MessageType messageType = message.getMessageType();
//        // 根据 message_type 获取 messageHandler 并调用
//        MessageHandler<GenericMessage> messageHandler = getMessageHandler(messageType);
//        handlerExecutor.execute(() -> {
//            messageHandler.execute(channelHandlerContext, message);
//        });
//    }
//
//    private MessageHandler<GenericMessage> getMessageHandler(GenericMessage.MessageType messageType) {
//        MessageHandler<GenericMessage> handler = handlers.get(messageType);
//        if (handler == null) {
//            throw new IllegalArgumentException(String.format("can not find MessageHandler(%s)", messageType));
//        }
//        return handler;
//    }
//
//    @Resource
//    private ApplicationContext applicationContext;
//
//    @Override
//    @SuppressWarnings("unchecked")
//    public void afterPropertiesSet() throws Exception {
//        // 加载所有 MessageHandler
//        applicationContext.getBeansOfType(MessageHandler.class).values().forEach(messageHandler -> {
//            handlers.put(messageHandler.getType(), (MessageHandler<GenericMessage>) messageHandler);
//        });
//        log.info("[afterPropertiesSet] message handler size: {}", handlers.size());
//    }
//
//}
