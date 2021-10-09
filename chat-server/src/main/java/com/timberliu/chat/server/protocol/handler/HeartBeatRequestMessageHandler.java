package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatRequestMessage;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatResponseMessage;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @author liujie
 * @date 2021/10/9
 */
@Slf4j
@Component
public class HeartBeatRequestMessageHandler implements MessageHandler<HeartBeatRequestMessage> {

	@Override
	public void execute(Channel channel, HeartBeatRequestMessage message) {
		log.info("[HeartBeat] recv message: {}", message);
		HeartBeatResponseMessage heartBeatResponseMessage = new HeartBeatResponseMessage();
		channel.writeAndFlush(heartBeatResponseMessage);
	}

	@Override
	public byte getType() {
		return CommandEnum.HeartBeatRequest.getCode();
	}
}
