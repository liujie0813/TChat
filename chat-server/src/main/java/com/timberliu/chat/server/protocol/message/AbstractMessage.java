package com.timberliu.chat.server.protocol.message;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;

/**
 * @author liujie
 * @date 2021/8/24
 */
@Data
public abstract class AbstractMessage {

    /**
     * 协议版本
     */
    @JSONField(deserialize = false, serialize = false)
    protected byte version = 1;

    @JSONField(deserialize = false, serialize = false)
    protected Long seqId;

    @JSONField(serialize = false)
    public abstract byte getCommand();
}
