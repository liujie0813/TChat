package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 群组信息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("group_info")
public class GroupInfoEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 群组Id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 群组名称
     */
    private String groupName;

    /**
     * 创建用户Id
     */
    private String createUserId;

    /**
     * 是否删除
     */
    private Integer deleted;

}
