package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 用户信息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("user_info")
public class UserInfoEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户Id
     */
    private Long userId;

    /**
     * 账号
     */
    private String account;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 加密后的密码
     */
    private String password;

    /**
     * 密码的盐值
     */
    private String passwordSalt;

    /**
     * 头像url
     */
    private String avatarUrl;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 性别
     */
    private Integer gender;

    /**
     * 地区-省份
     */
    private String province;

    /**
     * 地区-市县
     */
    private String city;

    /**
     * 个性签名
     */
    private String signature;

    /**
     * 是否删除
     */
    private Integer deleted;

}
