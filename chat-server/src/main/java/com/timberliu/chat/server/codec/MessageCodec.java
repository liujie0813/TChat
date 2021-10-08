package com.timberliu.chat.server.codec;

import com.timberliu.chat.server.codec.serialization.ISerializer;
import com.timberliu.chat.server.bean.Constant;
import com.timberliu.chat.server.bean.enums.CommandEnum;
import com.timberliu.chat.server.bean.enums.SerializerAlgorithmEnum;
import com.timberliu.chat.server.exception.InvalidProtocolException;
import com.timberliu.chat.server.protocol.message.AbstractMessage;
import com.timberliu.chat.server.util.IdentifyUtil;
import io.netty.buffer.ByteBuf;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * Message Format：
 *   +------------------------+---------+-------------+---------+---------+
 *   |     MAGIC_NUMBER(4位)  | Version | Serial_Algo | Command |     x   |
 *   |       0x19982021       |  0x01   |     0x01    |  0x01   |   保留   |
 *   +------------------------+---------+-------------+---------+---------+
 *   |                               SeqId(8位)                           |
 *   |                           0x0000000000000008                       |
 *   +------------------------+-------------------------------------------+
 *   |       Length（4位）     |               Body（Length字段决定）        |
 *   |       0x00000008       |                   xxxxxx                  |
 *   +------------------------+-------------------------------------------+
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
        // 保留位
        byteBuf.writeByte(0);
        byteBuf.writeLong(IdentifyUtil.nextSeqId());

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
        byte version = byteBuf.readByte();
        byte serializerAlgorithm = byteBuf.readByte();
        byte command = byteBuf.readByte();
        // 保留位，跳过
        byteBuf.skipBytes(1);
        long seqId = byteBuf.readLong();
        int dataLen = byteBuf.readInt();

        byte[] body = new byte[dataLen];
        byteBuf.readBytes(body);

        ISerializer serializer = getSerializer(serializerAlgorithm);
        Class<? extends AbstractMessage> requestType = getRequestType(command);
        if (requestType != null && serializer != null) {
            AbstractMessage abstractMessage = serializer.deserialize(body, requestType);
            abstractMessage.setSeqId(seqId);
            return abstractMessage;
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
        log.info("[initSerialization] serializer size: {}", serializerMap.size());
    }

    private void initPacketType() {
        for (CommandEnum commandEnum : CommandEnum.values()) {
            packetTypeMap.put(commandEnum.getCode(), commandEnum.getClazz());
        }
        log.info("[initPacketType] command size: {}", packetTypeMap.size());
    }

}
