package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.UserInfoDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * @author liujie
 * @date 2021/9/2
 */
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@GetMapping("/login")
	public ApiResult<UserInfoDTO> login(@RequestParam("username") String username,
										@RequestParam("password") String password) {
		log.info("[login] request param, username: {}, password: {}", username, password);
		UserInfoDTO loginResponseDTO = new UserInfoDTO();
		loginResponseDTO.setToken(UUID.randomUUID().toString());
		loginResponseDTO.setUserId(1L);
		loginResponseDTO.setUsername(username);
		loginResponseDTO.setSignature("haha");
		loginResponseDTO.setAccount("1");
		loginResponseDTO.setSex(0);
		loginResponseDTO.setProvince("China");
		loginResponseDTO.setCity("China");
		loginResponseDTO.setAvatarUrl("https://oss.timberliu.com/avatars/20210922/head_portrait.png");
		return ApiResult.success(loginResponseDTO);
	}

}
