package com.timberliu.chat.server.server.handler;

import com.timberliu.chat.server.codec.MessageCodecHandler;
import com.timberliu.chat.server.dispatcher.MessageDispatcher;
import io.netty.buffer.ByteBuf;
import io.netty.channel.*;
import io.netty.handler.codec.MessageToMessageDecoder;
import io.netty.handler.codec.MessageToMessageEncoder;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.*;
import io.netty.handler.codec.http.websocketx.extensions.compression.WebSocketServerCompressionHandler;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;
import io.netty.handler.timeout.ReadTimeoutHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static io.netty.buffer.Unpooled.buffer;
import static io.netty.buffer.Unpooled.wrappedBuffer;

/**
 * ChannelHandler 包括：
 *   1. 心跳检测、读取超时
 *   2. 协议（tcp、websocket）
 *   3. 序列化（json、protobuf）
 *   4. 消息分发及处理
 *   5. Channel 维护
 *
 * @author liujie
 * @date 2021/8/15
 */
@Slf4j
@Component
public class NettyServerChannelInitializer extends ChannelInitializer<Channel> {

    @Value("${netty.read.timeout}")
    private Long readTimeout;

    @Value("${netty.debug}")
    private boolean nettyDebug;

    @Resource
    private MessageCodecHandler messageCodecHandler;

    @Resource
    private MessageDispatcher messageDispatcher;

    @Resource
    private NettyServerHandler nettyServerHandler;

    @Override
    protected void initChannel(Channel channel) throws Exception {
        ChannelPipeline pipeline = channel.pipeline();
//        if (nettyDebug) {
//            pipeline.addLast(new LoggingHandler(LogLevel.INFO));
//        }

        // 空闲检测
        pipeline.addLast(new ReadTimeoutHandler(readTimeout, TimeUnit.SECONDS));

        // websocket
        pipeline.addLast(new HttpServerCodec())
                .addLast(new HttpObjectAggregator(65536))
                .addLast(new ChunkedWriteHandler())
                .addLast(new WebSocketServerCompressionHandler())
                .addLast(new WebSocketServerProtocolHandler(
                        "/tchat", null, true));

        pipeline.addLast(new MessageToMessageDecoder<WebSocketFrame>() {
            @Override
            protected void decode(ChannelHandlerContext channelHandlerContext, WebSocketFrame webSocketFrame, List<Object> list) throws Exception {
                if (webSocketFrame instanceof TextWebSocketFrame) {
                    TextWebSocketFrame textWebSocketFrame = (TextWebSocketFrame) webSocketFrame;
                    System.out.println(textWebSocketFrame.text());
                } else if (webSocketFrame instanceof BinaryWebSocketFrame) {
                    ByteBuf buf = webSocketFrame.content();
                    list.add(buf);
                    // bytebuf 复用，引用加一
                    buf.retain();
                } else if (webSocketFrame instanceof PongWebSocketFrame) {
//                    System.out.println();
                } else if (webSocketFrame instanceof CloseWebSocketFrame) {
//                    channel.close();
                }
            }
        });

        pipeline.addLast(new MessageToMessageEncoder<ByteBuf>() {
            @Override
            protected void encode(ChannelHandlerContext ctx, ByteBuf bytebuf, List<Object> out) throws Exception {
                WebSocketFrame webSocketFrame = new BinaryWebSocketFrame(bytebuf);
                out.add(webSocketFrame);
            }
        });

        // protobuf
//        pipeline.addLast(new ProtobufVarint32FrameDecoder())
//                .addLast(new ProtobufVarint32LengthFieldPrepender());

        // Protobuf 消息编解码器
//        pipeline.addLast(new ProtobufDecoder(ProtobufMessage.GenericMessage.getDefaultInstance()))
//                .addLast(new ProtobufEncoder());

        pipeline.addLast(messageCodecHandler);

        pipeline.addLast(messageDispatcher);

        // 消息分发
        pipeline.addLast(nettyServerHandler);
    }

}
