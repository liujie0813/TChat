package com.timberliu.chat.server.protocol.message.c2g;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class C2GSendRequestMessage extends AbstractMessage {

    private String fromId;

    private String talkId;

    private String content;

    @Override
    public byte getCommand() {
        return CommandEnum.C2GSendRequest.getCode();
    }
}
