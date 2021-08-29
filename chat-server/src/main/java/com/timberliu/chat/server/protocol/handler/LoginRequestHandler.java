package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.entity.Constant;
import com.timberliu.chat.server.entity.enums.SerializerAlgorithmEnum;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage;
import com.timberliu.chat.server.message.protobuf.ProtobufMessage.GenericMessage;
import com.timberliu.chat.server.server.NettyChannelManager;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Slf4j
@Component
public class LoginRequestHandler implements MessageHandler<GenericMessage> {

    @Resource
    private NettyChannelManager nettyChannelManager;

    @Override
    public void execute(ChannelHandlerContext ctx, GenericMessage genericMessage) {
        log.info("[execute] receive login message({})", genericMessage.getLoginRequest());
        ProtobufMessage.LoginRequest loginRequest = genericMessage.getLoginRequest();
        if (StringUtils.isEmpty(loginRequest.getPassword())) {
            ProtobufMessage.LoginResponse loginResponse = ProtobufMessage.LoginResponse.newBuilder()
                    .setSuccess(false).setErrMsg("未传入 password").build();
            sendLoginResponse(ctx.channel(), loginResponse);
            return;
        }
        // 校验密码 ...
        // 维护 channel
        nettyChannelManager.addUser(ctx.channel(), loginRequest.getUserId());

        ProtobufMessage.LoginResponse loginResponse = ProtobufMessage.LoginResponse.newBuilder()
                .setSuccess(true).build();
        sendLoginResponse(ctx.channel(), loginResponse);
    }

    private void sendLoginResponse(Channel channel, ProtobufMessage.LoginResponse loginResponse) {
        ProtobufMessage.GenericMessage genericMessage = GenericMessage.newBuilder()
                .setMagicNumber(Constant.MAGIC_NUMBER)
//                .setVersion()
                .setSerialAlgo(SerializerAlgorithmEnum.PROTOBUF.getCode())
                .setMessageType(GenericMessage.MessageType.LoginRequest)
                .setLength(loginResponse.toByteArray().length)
                .setLoginResponse(loginResponse).build();
        channel.writeAndFlush(genericMessage);
    }

    @Override
    public GenericMessage.MessageType getType() {
        return GenericMessage.MessageType.LoginRequest;
    }

}
