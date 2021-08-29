package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class C2CSendResponseMessage extends AbstractMessage {

    private Long msgId;

    @Override
    public byte getCommand() {
        return CommandEnum.C2CSendResponse.getCode();
    }
}
