package com.timberliu.chat.server.protocol.message;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/10/11
 */
@Data
@Accessors(chain = true)
public class GenericeMessage extends AbstractMessage {

	public GenericeMessage(ErrorCodeEnum errorCodeEnum) {
		this.code = errorCodeEnum.getCode();
		this.msg = errorCodeEnum.getMsg();
	}

	private Integer code;

	private String msg;

	@Override
	public byte getCommand() {
		return CommandEnum.GenericMessage.getCode();
	}
}
