package com.timberliu.chat.server.protocol.message.c2c;

import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public class C2CPushRequestMessage extends AbstractMessage {

    private Long msgId;

    private Long fromId;

    private Long talkId;

    private String content;

    private Long sendTime;

    @Override
    public byte getCommand() {
        return CommandEnum.C2CPushRequest.getCode();
    }
}
