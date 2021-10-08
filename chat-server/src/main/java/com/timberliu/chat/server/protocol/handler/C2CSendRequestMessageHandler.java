package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.bean.convert.MessageConvert;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.bean.enums.MsgTypeEnum;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendResponseMessage;
import com.timberliu.chat.server.service.IPushService;
import com.timberliu.chat.server.service.IStorageService;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author liujie
 * @date 2021/9/8
 */
@Slf4j
@Component
public class C2CSendRequestMessageHandler implements MessageHandler<C2CSendRequestMessage> {

	@Autowired
	private IStorageService storageService;

	@Autowired
	private IPushService pushService;

	@Override
	public void execute(Channel channel, C2CSendRequestMessage c2cSendRequestMessage) {
		log.info("[C2CSend] recv message: {}", c2cSendRequestMessage);
		// 存储消息
		HistoryMsgEntity historyMsgEntity = storageMessage(c2cSendRequestMessage);

		// 推送
		pushMessage(c2cSendRequestMessage, historyMsgEntity.getId(), historyMsgEntity.getSendTime());

		// ack
		C2CSendResponseMessage c2cSendResponseMessage = new C2CSendResponseMessage(
				c2cSendRequestMessage.getSeqId(), historyMsgEntity.getId(), historyMsgEntity.getSendTime());
		log.info("[C2CSend] ack resp: {}", c2cSendResponseMessage);
		channel.writeAndFlush(c2cSendResponseMessage);
	}

	@Override
	public byte getType() {
		return CommandEnum.C2CSendRequest.getCode();
	}

	private HistoryMsgEntity storageMessage(C2CSendRequestMessage c2cSendRequestMessage) {
		MessageStorageDTO messageStorageDTO = MessageConvert.INSTANCE.convertStorage(c2cSendRequestMessage);
		messageStorageDTO.setTalkType(TalkTypeEnum.SINGLE.getCode());
		messageStorageDTO.setMsgType(MsgTypeEnum.TEXT.getCode());
		return storageService.storageMessage(messageStorageDTO);
	}

	private void pushMessage(C2CSendRequestMessage c2cSendRequestMessage, Long msgId, Long sendTime) {
		C2CPushRequestMessage c2cPushRequestMessage = MessageConvert.INSTANCE.convertPush(c2cSendRequestMessage);
		c2cPushRequestMessage.setMsgId(msgId);
		c2cPushRequestMessage.setSendTime(sendTime);
		pushService.pushSingleMessage(c2cPushRequestMessage);
	}

}
