package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.bean.enums.CommandEnum;
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
public class C2CSendResponseMessage extends AbstractMessage {

    private Integer seqId;

    @Override
    public byte getCommand() {
        return CommandEnum.C2CSendResponse.getCode();
    }
}
