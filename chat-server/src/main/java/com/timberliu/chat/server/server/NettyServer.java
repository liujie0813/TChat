package com.timberliu.chat.server.server;

import com.timberliu.chat.server.server.handler.NettyServerChannelInitializer;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import java.net.InetSocketAddress;

/**
 * @author liujie
 * @date 2021/8/15
 */
@Slf4j
@Component
public class NettyServer {

    @Value("${netty.port}")
    private Integer port;

    @Resource
    private NettyServerChannelInitializer nettyServerChannelInitializer;

    private final EventLoopGroup bossGroup = new NioEventLoopGroup();

    private final EventLoopGroup workerGroup = new NioEventLoopGroup();

    private Channel channel;

    @PostConstruct
    public void nettyServerStart() {
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .localAddress(new InetSocketAddress(port))
                .childOption(ChannelOption.SO_KEEPALIVE, true)
                .childHandler(nettyServerChannelInitializer);
        try {
            ChannelFuture future = serverBootstrap.bind().sync();
            if (future.isSuccess()) {
                channel = future.channel();
                log.info("[nettyServerStart] Netty server started on port: {} ！！！", port);
            }
        } catch (InterruptedException e) {
            log.error("[nettyServerStart] Bind error", e);
        }
    }

    @PreDestroy
    public void shutdown() {
        if (channel != null) {
            channel.close();
        }
        bossGroup.shutdownGracefully();
        workerGroup.shutdownGracefully();
        log.info("[nettyServerStart] Netty server shutdown");
    }

}
