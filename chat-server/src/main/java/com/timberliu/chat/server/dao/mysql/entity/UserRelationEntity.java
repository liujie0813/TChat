package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 好友关系表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("user_relation")
public class UserRelationEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 自己的用户Id
     */
    private Long mainUser;

    /**
     * 好友的用户Id
     */
    private Long subUser;

    /**
     * 好友昵称备注
     */
    private String subNicknameRemark;

    /**
     * 是否删除
     */
    private Integer deleted;

}
