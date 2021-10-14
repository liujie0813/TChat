package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/10/14
 */
@Data
@Accessors(chain = true)
public class ApplyRequestMessage extends AbstractMessage {

	private Long mainUserId;

	private Long subUserId;

	@Override
	public byte getCommand() {
		return CommandEnum.ApplyRequest.getCode();
	}
}
