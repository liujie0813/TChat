package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.entity.ApiResult;
import com.timberliu.chat.server.entity.dto.LoginRequestDTO;
import com.timberliu.chat.server.entity.dto.LoginResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
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
	public ApiResult login(@Valid LoginRequestDTO loginRequestDTO) {
		log.info("[login] request param: {}", loginRequestDTO);
		LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
		loginResponseDTO.setUserId(1L);
		loginResponseDTO.setUsername(loginRequestDTO.getUsername());
		loginResponseDTO.setToken(UUID.randomUUID().toString());
		return new Random().nextBoolean() ? ApiResult.success(loginResponseDTO) : ApiResult.error(100001, "账号或密码错误");
	}

}
