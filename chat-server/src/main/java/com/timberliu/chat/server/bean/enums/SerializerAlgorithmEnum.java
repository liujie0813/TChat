package com.timberliu.chat.server.bean.enums;

import lombok.Getter;

/**
 * @author liujie
 * @date 2021/8/25
 */
@Getter
public enum SerializerAlgorithmEnum {

    PROTOBUF( (byte) 0, "protobuf"),
    JSON( (byte) 1, "json");

    private final byte code;
    private final String desc;

    private static SerializerAlgorithmEnum DEFAULT = JSON;

    SerializerAlgorithmEnum(byte code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static byte getByDesc(String desc) {
        for (SerializerAlgorithmEnum algorithmEnum : values()) {
            if (algorithmEnum.desc.equals(desc)) {
                return algorithmEnum.getCode();
            }
        }
        return DEFAULT.getCode();
    }
}
