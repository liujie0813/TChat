package com.timberliu.chat.server.protocol.message.heart.beat;

import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/25
 */
@Data
public class HeartBeatRequestMessage extends AbstractMessage {

    @Override
    public byte getCommand() {
        return CommandEnum.HeartBeatRequest.getCode();
    }
}
