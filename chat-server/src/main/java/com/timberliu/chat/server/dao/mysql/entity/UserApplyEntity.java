package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
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
 * 好友申请表
 * </p>
 *
 * @author liujie
 * @since 2021-10-14
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("user_apply")
@Accessors(chain = true)
public class UserApplyEntity extends BaseEntity {

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
     * 申请状态
     */
    private UserRelationStatusEnum applyStatus;

    /**
     * 申请时间
     */
    private Date applyTime;

    /**
     * 申请备注
     */
    private String applyRemark;

    /**
     * 是否删除
     */
    private Boolean deleted;


}
