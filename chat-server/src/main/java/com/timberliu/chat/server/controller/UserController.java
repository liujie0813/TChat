package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.UserLoginReqDTO;
import com.timberliu.chat.server.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * @author liujie
 * @date 2021/9/2
 */
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Resource
	private IUserService userService;

	@PostMapping("/login")
	public ApiResult<UserInfoDTO> login(UserLoginReqDTO userLoginReqDTO) {
		log.info("[login] request param, userLoginReqDTO: {}", userLoginReqDTO);
		UserInfoDTO userInfoDTO = userService.login(userLoginReqDTO);
		return ApiResult.success(userInfoDTO);
	}

	@GetMapping("/existAccount")
	public ApiResult<Boolean> existAccount(@RequestParam("account") String account) {
		Boolean exist = userService.existAccount(account);
		return ApiResult.success(exist);
	}

}
