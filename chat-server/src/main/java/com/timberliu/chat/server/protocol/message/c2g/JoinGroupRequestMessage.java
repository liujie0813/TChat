package com.timberliu.chat.server.protocol.message.c2g;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * @author liujie
 * @date 2021/10/12
 */
@Data
@Accessors(chain = true)
public class JoinGroupRequestMessage extends AbstractMessage {

	private Long createUserId;

	private Long talkId;

	private List<Long> memberIds;

	@Override
	public byte getCommand() {
		return CommandEnum.JoinGroupRequest.getCode();
	}
}
