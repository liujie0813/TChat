package com.timberliu.chat.server.entity.dto;

import lombok.*;

import java.util.List;

/**
 * @author Timber
 * @date 2021/9/5
 */
@Getter
@Setter
@ToString
public class GroupDTO {

	private Long groupId;

	private String groupName;

	private List<MemberDTO> memberDTOs;

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	public static class MemberDTO {
		private Long userId;
		private String userName;
	}
}
