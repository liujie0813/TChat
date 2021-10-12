package com.timberliu.chat.server.protocol.message.c2g;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/10/12
 */
@Data
public class JoinGroupResponseMessage extends AbstractMessage {

	@Override
	public byte getCommand() {
		return CommandEnum.JoinGroupResponse.getCode();
	}
}
