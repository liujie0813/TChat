package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/10/14
 */
@Data
public class ApplyResponseMessage extends AbstractMessage {



	@Override
	public byte getCommand() {
		return CommandEnum.ApplyResponse.getCode();
	}
}
