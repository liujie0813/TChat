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

	private Integer userId;

	private String username;
}
