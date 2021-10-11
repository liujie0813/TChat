package com.timberliu.chat.server.bean.dto.contact;

import lombok.Data;

/**
 * @author liujie
 * @date 2021/10/11
 */
@Data
public class GroupMemberDTO {

	private Long groupId;

	private Long userId;

	private String account;

	private String nickname;

	private String avatarUrl;

}
