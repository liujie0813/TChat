package com.timberliu.chat.server.protocol.message.login;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class LoginRequestMessage extends AbstractMessage {

    private String userId;

    private String userName;

    private String password;

    @Override
    public byte getCommand() {
        return CommandEnum.LoginRequest.getCode();
    }
}
