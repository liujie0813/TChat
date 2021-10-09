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
 * 群组-用户关系表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("group_user_relation")
@Accessors(chain = true)
public class GroupUserRelationEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 群组Id
     */
    private Long groupId;

    /**
     * 用户Id
     */
    private Long userId;

    /**
     * 群组名称备注
     */
    private String groupNameRemark;

    /**
     * 加入时间
     */
    private Date joinTime;

    /**
     * 是否删除
     */
    private Integer deleted;

}
