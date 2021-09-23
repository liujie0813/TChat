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
 * 历史消息(单聊)表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("history_msg_single")
public class HistoryMsgSingleEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 消息Id
     */
    private Long msgId;

    /**
     * 发送者Id
     */
    private Long fromId;

    /**
     * 接受者Id
     */
    private Long toId;

    /**
     * 消息类型
     */
    private Integer msgType;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 消息发送时间
     */
    private LocalDateTime sendTime;


}
