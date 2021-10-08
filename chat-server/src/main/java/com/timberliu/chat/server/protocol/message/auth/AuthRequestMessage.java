package com.timberliu.chat.server.protocol.message.auth;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class AuthRequestMessage extends AbstractMessage {

    private String accessToken;

    @Override
    public byte getCommand() {
        return CommandEnum.AuthRequest.getCode();
    }
}
