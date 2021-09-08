package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.AccessLevel;
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
public class C2CSendResponseMessage extends AbstractMessage {

    private Integer msgId;

    @Override
    public byte getCommand() {
        return CommandEnum.C2CSendResponse.getCode();
    }
}
