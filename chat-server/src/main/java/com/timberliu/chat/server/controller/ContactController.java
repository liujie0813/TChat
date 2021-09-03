package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.entity.ApiResult;
import com.timberliu.chat.server.entity.dto.ContactDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/3
 */
@RestController
@RequestMapping("/contact")
public class ContactController {

	@GetMapping("/getContactList")
	public ApiResult getContactList(@RequestParam("userId") String userId) {
		List<ContactDTO> contactDTOList = new ArrayList<>();
		for (int i = 123; i < 128; i++) {
			contactDTOList.add(new ContactDTO(i, String.valueOf(i)));
		}
		return ApiResult.success(contactDTOList);
	}
}
