package com.timberliu.chat.server.dao;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Data
public class BaseEntity implements Serializable {

	private Date createTime;

	private Date updateTime;

}
