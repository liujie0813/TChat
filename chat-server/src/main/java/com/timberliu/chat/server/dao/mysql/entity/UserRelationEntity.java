package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.Date;

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
@Accessors(chain = true)
public class UserRelationEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 自己的用户Id
     */
    private Long mainUserId;

    /**
     * 好友的用户Id
     */
    private Long subUserId;

    /**
     * 会话Id
     */
    private Long talkId;

    /**
     * 好友昵称备注
     */
    private String subNicknameRemark;

    /**
     * 是否删除
     */
    private Integer deleted;

}
