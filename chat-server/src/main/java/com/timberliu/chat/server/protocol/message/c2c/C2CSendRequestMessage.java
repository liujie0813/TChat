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
public class C2CSendRequestMessage extends AbstractMessage {

    private String from;

    private String to;

    private String content;

    private Long timestamp;

    @Override
    public byte getCommand() {
        return CommandEnum.C2CSendRequest.getCode();
    }
}
