package com.timberliu.chat.server.entity.dto;

import lombok.*;

/**
 * @author liujie
 * @date 2021/9/3
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ContactDTO {

	private Long userId;

	private String username;

	private Integer sex;

	private String signature;

	private String account;

	private String province;

	private String city;
}
