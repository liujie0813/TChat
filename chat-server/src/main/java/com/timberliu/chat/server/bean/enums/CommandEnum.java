package com.timberliu.chat.server.bean.enums;

import com.timberliu.chat.server.protocol.message.AbstractMessage;
import com.timberliu.chat.server.protocol.message.GenericeMessage;
import com.timberliu.chat.server.protocol.message.auth.AuthRequestMessage;
import com.timberliu.chat.server.protocol.message.auth.AuthResponseMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushResponseMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendResponseMessage;
import com.timberliu.chat.server.protocol.message.c2g.*;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatRequestMessage;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author liujie
 * @date 2021/8/27
 */
@Getter
@AllArgsConstructor
public enum CommandEnum {

    AuthRequest       ((byte) 0,  AuthRequestMessage.class),
    AuthResponse      ((byte) 1,  AuthResponseMessage.class),
    C2CSendRequest    ((byte) 2,  C2CSendRequestMessage.class),
    C2CSendResponse   ((byte) 3,  C2CSendResponseMessage.class),
    C2CPushRequest    ((byte) 4,  C2CPushRequestMessage.class),
    C2CPushResponse   ((byte) 5,  C2CPushResponseMessage.class),
    C2GSendRequest    ((byte) 6,  C2GSendRequestMessage.class),
    C2GSendResponse   ((byte) 7,  C2GSendResponseMessage.class),
    C2GPushRequest    ((byte) 8,  C2GPushRequestMessage.class ),
    C2GPushResponse   ((byte) 9,  C2GPushResponseMessage.class ),
    HeartBeatRequest  ((byte) 10, HeartBeatRequestMessage.class ),
    HeartBeatResponse ((byte) 11, HeartBeatResponseMessage.class ),
    JoinGroupRequest  ((byte) 12, JoinGroupRequestMessage.class),
    JoinGroupResponse ((byte) 12, JoinGroupResponseMessage.class),

    GenericMessage    ((byte) 99, GenericeMessage.class),
    ;

    final byte code;

    final Class<? extends AbstractMessage> clazz;
}
