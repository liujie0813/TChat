package com.timberliu.chat.server.bean.dto.contact;

import lombok.Data;

/**
 * @author liujie
 * @date 2021/10/14
 */
@Data
public class ApplyAddContactDTO {

	private Long mainUserId;

	private Long subUserId;

	private String applyRemark;

}
