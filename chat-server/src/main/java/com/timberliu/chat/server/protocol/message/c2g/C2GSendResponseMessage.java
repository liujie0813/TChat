package com.timberliu.chat.server.protocol.message.c2g;

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
public class C2GSendResponseMessage extends AbstractMessage {

    private Long seqId;

    private Long msgId;

    private Long sendTime;

    @Override
    public byte getCommand() {
        return CommandEnum.C2GSendResponse.getCode();
    }
}
