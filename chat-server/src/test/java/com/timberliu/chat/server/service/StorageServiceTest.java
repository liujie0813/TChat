package com.timberliu.chat.server.service;

import com.timberliu.chat.server.ChatServerApplicationTests;
import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.bean.enums.MsgTypeEnum;
import com.timberliu.chat.server.bean.enums.TalkTypeEnum;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author liujie
 * @date 2021/10/8
 */

public class StorageServiceTest extends ChatServerApplicationTests {

	@Autowired
	private IStorageService storageService;

	@Test
	public void testStorageMessage() {
		MessageStorageDTO messageStorageDTO = new MessageStorageDTO();
		messageStorageDTO.setTalkType(TalkTypeEnum.SINGLE.getCode());
		messageStorageDTO.setMsgType(MsgTypeEnum.TEXT.getCode());
		messageStorageDTO.setFromId(1L);
		messageStorageDTO.setTalkId(20211996L);
		long curTime = System.currentTimeMillis();
		messageStorageDTO.setContent("my name is 1, now is " + curTime);
		storageService.storageMessage(messageStorageDTO);
	}

}
