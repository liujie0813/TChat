package com.timberliu.chat.server.protocol.message.heart.beat;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/25
 */
@Data
public class HeartBeatResponseMessage extends AbstractMessage {

    @Override
    public byte getCommand() {
        return CommandEnum.HeartBeatResponse.getCode();
    }
}
