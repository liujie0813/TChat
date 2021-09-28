package com.timberliu.chat.server.dao.mysql.po;

import lombok.Data;

/**
 * @author liujie
 * @date 2021/9/27
 */
@Data
public class TalkInfoPO {

	private Long talkId;

	private Integer talkType;

	private Long userId;

	private String account;

	private Long groupId;

	private String talkName;

	private String avatarUrl;

}
