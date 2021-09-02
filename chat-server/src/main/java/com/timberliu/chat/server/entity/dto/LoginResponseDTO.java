package com.timberliu.chat.server.entity.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author liujie
 * @date 2021/9/2
 */
@Getter
@Setter
@ToString
public class LoginResponseDTO {

	private Long userId;

	private String username;

	private String token;
}
