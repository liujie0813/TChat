package com.timberliu.chat.server.bean.dto;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/9/3
 */
@Data
@Accessors(chain = true)
public class ContactDTO {

	private Long talkId;

	private Long userId;

	private String account;

	private String nickname;

	private String nickenameRemark;

	private String avatarUrl;

	private String phone;

	private Integer gender;

	private String signature;

	private String province;

	private String city;

}
