package com.timberliu.chat.server.bean.dto.contact;

import lombok.*;

import java.util.List;

/**
 * @author Timber
 * @date 2021/9/5
 */
@Data
public class GroupDTO {

	private Long groupId;

	private Long talkId;

	private String groupName;

	private String groupNameRemark;

	private Long createUserId;

}
