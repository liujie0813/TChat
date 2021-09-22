package com.timberliu.chat.server.protocol.message.logout;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class LogoutResponseMessage extends AbstractMessage {

    private Boolean success;

    private String errMsg;

    @Override
    public byte getCommand() {
        return CommandEnum.LogoutResponse.getCode();
    }
}
