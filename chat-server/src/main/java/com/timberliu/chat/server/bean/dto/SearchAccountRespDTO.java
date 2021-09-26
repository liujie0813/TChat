package com.timberliu.chat.server.bean.dto;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Data
@Accessors(chain = true)
public class SearchAccountRespDTO {

	private Long userId;

	private String account;

	private String nickname;

	private String avatarUrl;
}
