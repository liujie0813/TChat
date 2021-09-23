package com.timberliu.chat.server.bean.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Data
@Accessors(chain = true)
public class UserLoginReqDTO implements Serializable {

	/**
	 * 账号
	 */
	@NotEmpty(message = "账号不能为空")
	@Pattern(regexp = "[0-9A-Za-z]{6,20}", message = "账号必须由 6-20 位数字或字母组成")
	private String account;

	/**
	 * 密码
	 */
	@NotEmpty(message = "密码不能为空")
	@Size(min = 6, max = 20, message = "密码长度为 6-20 位")
	private String password;
}
