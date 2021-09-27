package com.timberliu.chat.server.bean.dto.chat;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author liujie
 * @date 2021/9/26
 */
@Data
public class GetRecordReqDTO {

	private Integer talkType;

	private Long talkId;

	private Long lastMsgId;

	private Long pageNum = 1L;

	private Long pageSize = 10L;

}
