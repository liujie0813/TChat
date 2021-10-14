package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.auth.NotRequireAuth;
import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.SearchAccountRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.bean.dto.auth.AuthRefreshTokenReqDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginRespDTO;
import com.timberliu.chat.server.bean.dto.user.UserLoginReqDTO;
import com.timberliu.chat.server.service.IAuthService;
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

	@Resource
	private IAuthService authService;

	@PostMapping("/login-by-account")
	@NotRequireAuth
	public ApiResult<UserLoginRespDTO> loginByAccount(@RequestBody UserLoginReqDTO userLoginReqDTO, HttpServletRequest request) {
		UserLoginRespDTO userInfoDTO = userService.login(userLoginReqDTO, HttpUtils.getIp(request));
		return ApiResult.success(userInfoDTO);
	}

	@GetMapping("/exist-account")
	@NotRequireAuth
	public ApiResult<Boolean> existAccount(@NotEmpty(message = "账号不能为空")
										   @Pattern(regexp = "^[0-9A-Za-z]{6,20}$", message = "账号必须由 6-20 位数字或字母组成")
										   @RequestParam("account") String account) {
		Boolean exist = userService.existAccount(account);
		return ApiResult.success(exist);
	}

	@GetMapping("/refresh-token")
	@NotRequireAuth
	public ApiResult<AuthAccessTokenRespDTO> refreshToken(@RequestParam("refreshToken") String refreshToken, HttpServletRequest request) {
		AuthAccessTokenRespDTO authAccessTokenRespDTO = authService.refreshAccessToken(new AuthRefreshTokenReqDTO()
				.setRefreshToken(refreshToken).setCreateIp(HttpUtils.getIp(request)));
		return ApiResult.success(authAccessTokenRespDTO);
	}

	@GetMapping("/search-by-account")
	public ApiResult<SearchAccountRespDTO> searchByAccount(@RequestParam("userId") Long userId,
														   @RequestParam("account") String account) {
		SearchAccountRespDTO searchAccountRespDTO = userService.searchByAccount(userId, account);
		return ApiResult.success(searchAccountRespDTO);
	}

}
