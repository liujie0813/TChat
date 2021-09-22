package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.ContactDTO;
import com.timberliu.chat.server.bean.dto.GroupDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

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
		Random random = new Random();
		for (int i = 100; i < 600; i += 100) {
			// 100 200 300 400 500
			contactDTOList.add(new ContactDTO((long) i, String.valueOf(i), random.nextInt(2),
					"my signature is " + i + "。", "account_" + i,
					"北京", "北京"));
		}
		return ApiResult.success(contactDTOList);
	}

	@GetMapping("/getGroupList")
	public ApiResult getGroupList(@RequestParam("userId") String userId) {
		List<GroupDTO> groupDTOList = new ArrayList<>();
		for (int i = 1000; i <= 4000; i += 2000) {
			// 1000 3000 5000
			GroupDTO groupDTO = new GroupDTO();
			groupDTO.setGroupId((long) i);
			groupDTO.setGroupName(String.valueOf(i));
			groupDTO.setMemberDTOs(Arrays.asList(
					new GroupDTO.MemberDTO((long) i / 10, String.valueOf(i / 10 + 100)),
					new GroupDTO.MemberDTO((long) i / 10 + 100, String.valueOf(i / 10 + 100))
			));

			groupDTOList.add(groupDTO);
		}
		return ApiResult.success(groupDTOList);
	}
}
