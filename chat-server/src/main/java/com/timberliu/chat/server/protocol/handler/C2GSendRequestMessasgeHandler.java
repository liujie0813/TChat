package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.bean.convert.MessageConvert;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.bean.enums.MsgTypeEnum;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GSendResponseMessage;
import com.timberliu.chat.server.service.IPushService;
import com.timberliu.chat.server.service.IStorageService;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Timber
 * @date 2021/10/11
 */
@Slf4j
@Component
public class C2GSendRequestMessasgeHandler implements MessageHandler<C2GSendRequestMessage> {

	@Autowired
	private IStorageService storageService;

	@Autowired
	private IPushService pushService;

	@Override
	public void execute(Channel channel, C2GSendRequestMessage c2gSendRequestMessage) {
		log.info("[C2GSend] recv message: {}", c2gSendRequestMessage);
		HistoryMsgEntity historyMsgEntity = storageMessage(c2gSendRequestMessage);
		pushMessage(c2gSendRequestMessage, historyMsgEntity.getId(), historyMsgEntity.getSendTime());

		C2GSendResponseMessage c2gSendResponseMessage = new C2GSendResponseMessage(
				c2gSendRequestMessage.getSeqId(), historyMsgEntity.getId(), historyMsgEntity.getSendTime());
		log.info("[C2GSend] ack resp: {}", c2gSendResponseMessage);
		channel.writeAndFlush(c2gSendResponseMessage);
	}

	@Override
	public byte getType() {
		return CommandEnum.C2GSendRequest.getCode();
	}

	private HistoryMsgEntity storageMessage(C2GSendRequestMessage c2GSendRequestMessage) {
		MessageStorageDTO messageStorageDTO = MessageConvert.INSTANCE.convertStorage(c2GSendRequestMessage);
		messageStorageDTO.setTalkType(TalkTypeEnum.GROUP.getCode());
		messageStorageDTO.setMsgType(MsgTypeEnum.TEXT.getCode());
		return storageService.storageMessage(messageStorageDTO);
	}

	private void pushMessage(C2GSendRequestMessage c2gSendRequestMessage, Long msgId, Long sendTime) {
		C2GPushRequestMessage c2gPushRequestMessage = MessageConvert.INSTANCE.convertPush(c2gSendRequestMessage);
		c2gPushRequestMessage.setMsgId(msgId);
		c2gPushRequestMessage.setSendTime(sendTime);
		pushService.pushGroupMessage(c2gPushRequestMessage);
	}

}
