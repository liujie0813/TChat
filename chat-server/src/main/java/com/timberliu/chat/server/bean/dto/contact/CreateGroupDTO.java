package com.timberliu.chat.server.bean.dto.contact;

import lombok.Data;

import java.util.List;

/**
 * @author liujie
 * @date 2021/10/9
 */
@Data
public class CreateGroupDTO {

	private String groupName;

	private Long createUserId;

	private List<Long> memberIds;

}
