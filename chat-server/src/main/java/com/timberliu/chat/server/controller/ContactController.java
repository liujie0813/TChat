package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.contact.ContactDTO;
import com.timberliu.chat.server.bean.dto.contact.CreateGroupDTO;
import com.timberliu.chat.server.bean.dto.contact.GroupDTO;
import com.timberliu.chat.server.service.IContactService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

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

	@PostMapping("/create-group")
	public ApiResult<GroupDTO> createGroup(@RequestBody CreateGroupDTO createGroupDTO) {
		GroupDTO groupDTO = contactService.createGroup(createGroupDTO);
		return ApiResult.success(groupDTO);
	}

	@GetMapping("/get-groups")
	public ApiResult<List<GroupDTO>> getGroups(@RequestParam("userId") Long userId) {
		List<GroupDTO> groupList = contactService.getGroupList(userId);
		return ApiResult.success(groupList);
	}

}
