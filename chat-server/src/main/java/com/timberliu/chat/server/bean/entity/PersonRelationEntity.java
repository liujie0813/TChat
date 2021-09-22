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
 * 好友关系表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("person_relation")
public class PersonRelationEntity implements Serializable {

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

    private LocalDateTime createTime;

    private LocalDateTime updateTime;


}
