package com.timberliu.chat.server.codec.serialization;

import com.alibaba.fastjson.JSON;
import com.timberliu.chat.server.bean.enums.SerializerAlgorithmEnum;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * @author liujie
 * @date 2021/8/26
 */
@Component
@ConditionalOnProperty(name = "netty.handler.serial_algo", havingValue = "json")
public class JsonSerializer implements ISerializer {

    @Override
    public byte getSerializerAlgorithm() {
        return SerializerAlgorithmEnum.JSON.getCode();
    }

    @Override
    public byte[] serialize(Object object) {
        return JSON.toJSONBytes(object);
    }

    @Override
    public <T> T deserialize(byte[] bytes, Class<T> clazz) {
        return JSON.parseObject(bytes, clazz);
    }
}
