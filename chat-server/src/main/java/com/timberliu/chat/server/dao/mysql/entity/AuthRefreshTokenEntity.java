package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 刷新令牌表
 * </p>
 *
 * @author liujie
 * @since 2021-09-24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("auth_refresh_token")
@Accessors(chain = true)
public class AuthRefreshTokenEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户Id
     */
    private Long userId;

    /**
     * 刷新令牌
     */
    private String refreshToken;

    /**
     * 过期时间
     */
    private Date expireTime;

    /**
     * 创建IP
     */
    private String createIp;

    /**
     * 是否删除
     */
    private Integer deleted;


}
