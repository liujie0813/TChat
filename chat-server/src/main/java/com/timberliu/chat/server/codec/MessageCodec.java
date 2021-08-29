package com.timberliu.chat.server.codec;

import com.timberliu.chat.server.codec.serialization.ISerializer;
import com.timberliu.chat.server.entity.Constant;
import com.timberliu.chat.server.entity.enums.CommandEnum;
import com.timberliu.chat.server.entity.enums.SerializerAlgorithmEnum;
import com.timberliu.chat.server.exception.InvalidProtocolException;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import io.netty.buffer.ByteBuf;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.io.File;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * Message Format：
 *   +--------------+---------+-------------+---------+------------+---------+
 *   |                              Head                           |  Body   |
 *   | MAGIC_NUMBER | Version | Serial_Algo | Command |   Length   |  Body   |
 *   |  0x19982021  |  0x01   |     0x01    |  0x01   | 0x00000008 |   ...   |
 *   +--------------+---------+-------------+---------+------------+---------+
 *
 * @author liujie
 * @date 2021/8/26
 */
@Slf4j
@Component
public class MessageCodec implements InitializingBean {

    @Value("${netty.handler.serial_algo}")
    private String serialAlgo;

    private static final Map<Byte, Class<? extends AbstractMessage>> packetTypeMap = new HashMap<>();
    private static final Map<Byte, ISerializer> serializerMap = new HashMap<>();

    /**
     * IMessage 编码为 byteBuf
     */
    public void encode(AbstractMessage message, ByteBuf byteBuf) {
        byteBuf.writeInt(Constant.MAGIC_NUMBER);
        byteBuf.writeByte(message.getVersion());
        byte serialAlgoByte = SerializerAlgorithmEnum.getByDesc(serialAlgo);
        byteBuf.writeByte(serialAlgoByte);
        byteBuf.writeByte(message.getCommand());

        ISerializer serializer = getSerializer(serialAlgoByte);
        byte[] body = serializer.serialize(message);
        byteBuf.writeInt(body.length);
        byteBuf.writeBytes(body);
    }

    /**
     * byteBuf 解码为 IMessage
     */
    public AbstractMessage decode(ByteBuf byteBuf) {
        if (byteBuf.readInt() != Constant.MAGIC_NUMBER) {
            throw new InvalidProtocolException(String.format("invalid magic_number: %s, close channel directly", byteBuf.readInt()));
        }
        byteBuf.skipBytes(1);
        byte serializerAlgorithm = byteBuf.readByte();
        byte command = byteBuf.readByte();
        int dataLen = byteBuf.readInt();

        byte[] body = new byte[dataLen];
        byteBuf.readBytes(body);

        ISerializer serializer = getSerializer(serializerAlgorithm);
        Class<? extends AbstractMessage> requestType = getRequestType(command);
        if (requestType != null && serializer != null) {
            return serializer.deserialize(body, requestType);
        }
        return null;
    }

    private ISerializer getSerializer(byte serializerAlgorithm) {
        return serializerMap.get(serializerAlgorithm);
    }

    private Class<? extends AbstractMessage> getRequestType(byte command) {
        return packetTypeMap.get(command);
    }

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    public void afterPropertiesSet() throws Exception {
        initSerialization();
        initPacketType();
    }

    private void initSerialization() {
        applicationContext.getBeansOfType(ISerializer.class).values().forEach(iSerializer -> {
            serializerMap.put(iSerializer.getSerializerAlgorithm(), iSerializer);
        });
    }

    private void initPacketType() {
        for (CommandEnum commandEnum : CommandEnum.values()) {
            packetTypeMap.put(commandEnum.getCode(), commandEnum.getClazz());
        }
    }

}
