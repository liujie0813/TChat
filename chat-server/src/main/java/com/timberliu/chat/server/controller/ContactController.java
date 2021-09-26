package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.ContactDTO;
import com.timberliu.chat.server.bean.dto.GroupDTO;
import com.timberliu.chat.server.service.IContactService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

	@Resource
	private IContactService contactService;

	/**
	 * TODO 直接添加，无需同意
	 */
	@GetMapping("/add-contact")
	public ApiResult<Boolean> addUser(@RequestParam("mainUserId") Long mainUserId,
									  @RequestParam("subUserId") Long subUserId) {
		Boolean success = contactService.addContact(mainUserId, subUserId);
		return ApiResult.success(success);
	}

	@GetMapping("/get-contacts")
	public ApiResult<List<ContactDTO>> getContactList(@RequestParam("userId") Long userId) {
		List<ContactDTO> contactList = contactService.getContactList(userId);
		return ApiResult.success(contactList);
	}

	@GetMapping("/get-groups")
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
