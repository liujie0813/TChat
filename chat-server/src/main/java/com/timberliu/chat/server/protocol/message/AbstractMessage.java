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
    public byte version = 1;

    public abstract byte getCommand();
}
