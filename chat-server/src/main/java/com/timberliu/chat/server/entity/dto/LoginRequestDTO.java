package com.timberliu.chat.server.entity.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @author liujie
 * @date 2021/9/2
 */
@Getter
@Setter
@ToString
public class LoginRequestDTO {

	@NotBlank(message = "昵称不能为空")
	@Length(min = 6, max = 20, message = "昵称必须在 6~20 个字符之间")
	private String username;

	@NotBlank(message = "密码不能为空")
	private String password;
}
