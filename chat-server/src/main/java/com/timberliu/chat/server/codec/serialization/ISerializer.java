package com.timberliu.chat.server.codec.serialization;

/**
 * @author liujie
 * @date 2021/8/26
 */

public interface ISerializer {

    /**
     * 序列化算法
     */
    byte getSerializerAlgorithm();

    /**
     * java 对象转换成二进制
     */
    byte[] serialize(Object object);

    /**
     * 二进制转换成 java 对象
     */
    <T> T deserialize(byte[] bytes, Class<T> clazz);
}
