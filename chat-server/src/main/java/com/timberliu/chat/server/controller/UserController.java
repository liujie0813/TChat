package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.entity.ApiResult;
import com.timberliu.chat.server.entity.dto.UserInfoDTO;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Length;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;
import java.util.Random;
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
		loginResponseDTO.setUserId(1L);
		loginResponseDTO.setUsername(username);
		loginResponseDTO.setToken(UUID.randomUUID().toString());
		return ApiResult.success(loginResponseDTO);
	}

}
