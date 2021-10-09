package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 群组信息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("group_info")
@Accessors(chain = true)
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
     * 会话Id
     */
    private Long talkId;

    /**
     * 创建用户Id
     */
    private Long createUserId;

    /**
     * 是否删除
     */
    private Integer deleted;

}
