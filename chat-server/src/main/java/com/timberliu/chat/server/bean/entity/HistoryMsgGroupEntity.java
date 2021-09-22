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
 * 历史消息(群聊)表
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("history_msg_group")
public class HistoryMsgGroupEntity implements Serializable {

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
     * 群组Id
     */
    private Long groupId;

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

    private LocalDateTime createTime;

    private LocalDateTime updateTime;


}
