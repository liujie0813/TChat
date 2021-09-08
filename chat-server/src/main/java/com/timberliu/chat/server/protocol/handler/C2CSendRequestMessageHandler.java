package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendResponseMessage;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @author liujie
 * @date 2021/9/8
 */
@Slf4j
@Component
public class C2CSendRequestMessageHandler implements MessageHandler<C2CSendRequestMessage> {

	@Override
	public void execute(Channel channel, C2CSendRequestMessage c2cSendRequestMessage) {
		log.info("[C2CSend] recv message: {}", c2cSendRequestMessage);
		// 存储消息

		// 推送

		// ack
		C2CSendResponseMessage c2cSendResponseMessage = new C2CSendResponseMessage(c2cSendRequestMessage.getMsgId());
		log.info("[C2CSend] ack resp: {}", c2cSendResponseMessage);
		channel.writeAndFlush(c2cSendResponseMessage);
	}

	@Override
	public byte getType() {
		return CommandEnum.C2CSendRequest.getCode();
	}
}
