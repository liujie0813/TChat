package com.timberliu.chat.server.bean.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
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
@EqualsAndHashCode(callSuper = false)
@TableName("person_info")
public class PersonInfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户Id
     */
    private Long personId;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 昵称备注
     */
    private String nicknameRemark;

    /**
     * 密码
     */
    private String password;

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
    private Boolean gender;

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

    private LocalDateTime createTime;

    private LocalDateTime updateTime;


}
