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
 * 群组信息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("group_info")
public class GroupInfoEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 群组Id
     */
    private Long groupId;

    /**
     * 群组名称
     */
    private String groupName;

    /**
     * 创建用户Id
     */
    private String createUserId;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;


}
