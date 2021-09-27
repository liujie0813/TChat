package com.timberliu.chat.server.dao.mysql.entity;

import com.timberliu.chat.server.dao.BaseEntity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 历史消息表
 * </p>
 *
 * @author liujie
 * @since 2021-09-27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("history_msg")
public class HistoryMsgEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 会话Id
     */
    private Long talkId;

    /**
     * 会话类型
     */
    private Integer talkType;

    /**
     * 消息类型
     */
    private Integer msgType;

    /**
     * 发送者Id
     */
    private Long fromId;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 消息发送时间
     */
    private Long sendTime;

    /**
     * 是否删除
     */
    private Integer deleted;

}
