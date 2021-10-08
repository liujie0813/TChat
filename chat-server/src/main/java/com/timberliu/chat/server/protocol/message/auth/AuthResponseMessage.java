package com.timberliu.chat.server.protocol.message.auth;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class AuthResponseMessage extends AbstractMessage {

    private Integer code;

    private String msg;

    @Override
    public byte getCommand() {
        return CommandEnum.AuthResponse.getCode();
    }
}
