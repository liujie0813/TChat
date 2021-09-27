package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 会话信息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("talk_info")
public class TalkInfoEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 会话Id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会话类型
     */
    private Integer talkType;

    /**
     * 群聊Id
     */
    private Long groupId;

    /**
     * 自己的用户Id
     */
    private Long mainUserId;

    /**
     * 好友的用户Id
     */
    private Long subUserId;

    /**
     * 是否删除
     */
    private Integer deleted;

}
