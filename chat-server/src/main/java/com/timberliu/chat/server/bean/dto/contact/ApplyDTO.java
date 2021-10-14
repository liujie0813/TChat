package com.timberliu.chat.server.bean.dto.contact;

import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
import lombok.Data;

import java.util.Date;

/**
 * @author liujie
 * @date 2021/10/14
 */
@Data
public class ApplyDTO {

	private Long applyUserId;

	private UserRelationStatusEnum applyStatus;

	private String applyRemark;

	private Date applyTime;

	private Long talkId;

	private String account;

	private String nickname;

	private String avatarUrl;

}
