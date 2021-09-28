package com.timberliu.chat.server.bean.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * @author liujie
 * @date 2021/9/28
 */
@Data
@Accessors(chain = true)
public class AccessLogCreateDTO implements Serializable {

	private Long userId;

	private String traceId;

	private String applicationName;

	private String uri;

	private String queryString;

	private String method;

	private String userAgent;

	private String ip;

	private Date startTime;

	private Integer responseTime;

	private Integer errorCode;

	private String errorMsg;
}
