package com.timberliu.chat.server.protocol.message.c2g;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
@Accessors(chain = true)
public class C2GPushRequestMessage extends AbstractMessage {

    private Long msgId;

    private Long fromId;

    private Long talkId;

    private String content;

    private Long sendTime;

    @Override
    public byte getCommand() {
        return CommandEnum.C2GPushRequest.getCode();
    }
}
