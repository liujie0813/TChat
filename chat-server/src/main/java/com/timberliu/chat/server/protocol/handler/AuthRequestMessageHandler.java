package com.timberliu.chat.server.protocol.handler;

import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.bean.enums.ErrorCodeEnum;
import com.timberliu.chat.server.exception.BizException;
import com.timberliu.chat.server.protocol.message.auth.AuthRequestMessage;
import com.timberliu.chat.server.protocol.message.auth.AuthResponseMessage;
import com.timberliu.chat.server.server.NettyChannelManager;
import com.timberliu.chat.server.service.IAuthService;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author liujie
 * @date 2021/9/8
 */
@Slf4j
@Component
public class AuthRequestMessageHandler implements MessageHandler<AuthRequestMessage> {

	@Resource
	private IAuthService authService;

	@Autowired
	private NettyChannelManager nettyChannelManager;

	@Override
	public void execute(Channel channel, AuthRequestMessage authRequestMessage) {
		log.info("[Auth] recv message: {}", authRequestMessage);
		if (StringUtils.isBlank(authRequestMessage.getAccessToken())) {
			AuthResponseMessage authResponseMessage = new AuthResponseMessage(
					ErrorCodeEnum.AUTH_ACCESS_TOKEN_NOT_FOUND.getCode(), ErrorCodeEnum.AUTH_ACCESS_TOKEN_NOT_FOUND.getMsg());
			channel.writeAndFlush(authResponseMessage);
			return;
		}
		// 验证 accessToken
		Long userId = null;
		try {
			AuthAccessTokenRespDTO authAccessTokenRespDTO = authService.checkAccessToken(authRequestMessage.getAccessToken());
			userId = authAccessTokenRespDTO.getUserId();
		} catch (BizException e) {
			AuthResponseMessage authResponseMessage = new AuthResponseMessage(e.getCode(), e.getMsg());
			channel.writeAndFlush(authResponseMessage);
			return;
		}
		// 将用户和 Channel 绑定
		nettyChannelManager.addUser(channel, userId);

		AuthResponseMessage authResponseMessage = new AuthResponseMessage().setCode(0);
		log.info("[Auth] resp: {}", authResponseMessage);
		channel.writeAndFlush(authResponseMessage);
	}

	@Override
	public byte getType() {
		return CommandEnum.AuthRequest.getCode();
	}

}
