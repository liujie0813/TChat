package com.timberliu.chat.server.bean.enums;

import com.timberliu.chat.server.protocol.message.AbstractMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushResponseMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendResponseMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GPushResponseMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GSendRequestMessage;
import com.timberliu.chat.server.protocol.message.c2g.C2GSendResponseMessage;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatRequestMessage;
import com.timberliu.chat.server.protocol.message.heart.beat.HeartBeatResponseMessage;
import com.timberliu.chat.server.protocol.message.login.LoginRequestMessage;
import com.timberliu.chat.server.protocol.message.login.LoginResponseMessage;
import com.timberliu.chat.server.protocol.message.logout.LogoutRequestMessage;
import com.timberliu.chat.server.protocol.message.logout.LogoutResponseMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author liujie
 * @date 2021/8/27
 */
@Getter
@AllArgsConstructor
public enum CommandEnum {

    LoginRequest      ((byte) 0,  LoginRequestMessage.class),
    LoginResponse     ((byte) 1,  LoginResponseMessage.class),
    LogoutRequest     ((byte) 2,  LogoutRequestMessage.class),
    LogoutResponse    ((byte) 3,  LogoutResponseMessage.class),
    C2CSendRequest    ((byte) 4,  C2CSendRequestMessage.class),
    C2CSendResponse   ((byte) 5,  C2CSendResponseMessage.class),
    C2CPushRequest    ((byte) 6,  C2CPushRequestMessage.class),
    C2CPushResponse   ((byte) 7,  C2CPushResponseMessage.class),
    C2GSendRequest    ((byte) 8,  C2GSendRequestMessage.class),
    C2GSendResponse   ((byte) 9,  C2GSendResponseMessage.class),
    C2GPushRequest    ((byte) 10, C2GPushRequestMessage.class ),
    C2GPushResponse   ((byte) 11, C2GPushResponseMessage.class ),
    HeartBeatRequest  ((byte) 12, HeartBeatRequestMessage.class ),
    HeartBeatResponse ((byte) 13, HeartBeatResponseMessage.class );

    final byte code;

    final Class<? extends AbstractMessage> clazz;
}
