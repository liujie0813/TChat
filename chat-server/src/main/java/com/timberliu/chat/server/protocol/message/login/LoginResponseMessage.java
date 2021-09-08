package com.timberliu.chat.server.protocol.message.login;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseMessage extends AbstractMessage {

    private Boolean success;

    private String errMsg;

    @Override
    public byte getCommand() {
        return CommandEnum.LoginResponse.getCode();
    }
}
