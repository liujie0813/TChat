package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.contact.*;
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

	@GetMapping("/get-applys")
	public ApiResult<List<ApplyDTO>> getApplyList(@RequestParam("userId") Long userId) {
		List<ApplyDTO> applyDTOList = contactService.getApplyList(userId);
		return ApiResult.success(applyDTOList);
	}

	@PostMapping("/apply-add-contact")
	public ApiResult<Boolean> applyAddUser(@RequestBody ApplyAddContactDTO applyAddContactDTO) {
		Boolean success = contactService.applyAddContact(applyAddContactDTO);
		return ApiResult.success(success);
	}

	@PostMapping("/agree-add-contact")
	public ApiResult<Boolean> agreeAddUser(@RequestBody AgreeAddContactDTO agreeAddContactDTO) {
		Boolean success = contactService.agreeAddContact(agreeAddContactDTO);
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
