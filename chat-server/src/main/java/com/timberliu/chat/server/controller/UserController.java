package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.auth.NotRequireAuth;
import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.user.UserLoginRespDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginReqDTO;
import com.timberliu.chat.server.service.IUserService;
import com.timberliu.chat.server.util.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author liujie
 * @date 2021/9/2
 */
@Slf4j
@RestController
@RequestMapping("/user")
@Validated
public class UserController {

	@Resource
	private IUserService userService;

	@PostMapping("/login")
	@NotRequireAuth
	public ApiResult<UserLoginRespDTO> login(@RequestBody UserLoginReqDTO userLoginReqDTO, HttpServletRequest request) {
		log.info("[login] request param, userLoginReqDTO: {}", userLoginReqDTO);
		UserLoginRespDTO userInfoDTO = userService.login(userLoginReqDTO, HttpUtils.getIp(request));
		return ApiResult.success(userInfoDTO);
	}

	@GetMapping("/existAccount")
	@NotRequireAuth
	public ApiResult<Boolean> existAccount(@NotEmpty(message = "账号不能为空")
										   @Pattern(regexp = "^[0-9A-Za-z]{6,20}$", message = "账号必须由 6-20 位数字或字母组成")
										   @RequestParam("account") String account) {
		Boolean exist = userService.existAccount(account);
		return ApiResult.success(exist);
	}

}
