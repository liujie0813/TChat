package com.timberliu.chat.server.server;

import com.timberliu.chat.server.message.protobuf.ProtobufMessage;
import io.netty.channel.Channel;
import io.netty.channel.ChannelId;
import io.netty.util.AttributeKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Slf4j
@Component
public class NettyChannelManager {

    private static final AttributeKey<String> CHANNEL_ATTR_KEY_USER = AttributeKey.newInstance("user");

    /**
     * Channel 映射
     */
    private ConcurrentMap<ChannelId, Channel> idChannelMap = new ConcurrentHashMap<>();

    /**
     * 用户与 Channel 的映射
     */
    private ConcurrentMap<String, Channel> userChannelMap = new ConcurrentHashMap<>();

    public void add(Channel channel) {
        idChannelMap.put(channel.id(), channel);
        log.info("[add] Connect({}) added", channel.id());
    }

    public void addUser(Channel channel, String user) {
        Channel exist = idChannelMap.get(channel.id());
        if (exist == null) {
            log.error("[addUser] Connect({}) not exist", channel.id());
            return;
        }
        channel.attr(CHANNEL_ATTR_KEY_USER).set(user);
        userChannelMap.put(user, channel);
        log.info("[addUser] Connect({}) added", channel.id());
    }

    public void remove(Channel channel) {
        idChannelMap.remove(channel.id());
        if (channel.hasAttr(CHANNEL_ATTR_KEY_USER)) {
            userChannelMap.remove(channel.attr(CHANNEL_ATTR_KEY_USER).get());
        }
        log.info("[remove] Connect({}) removed", channel.id());
    }

    public void send(String user, ProtobufMessage.GenericMessage message) {
        Channel channel = userChannelMap.get(user);
        if (channel == null) {
            log.error("[send] connect not exist");
            return;
        }
        if (!channel.isActive()) {
            log.error("[send] connect({}) not active", channel.id());
            return;
        }
        channel.writeAndFlush(message);
    }

}
