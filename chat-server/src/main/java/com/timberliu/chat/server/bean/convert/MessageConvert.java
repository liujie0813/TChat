package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.protocol.message.c2c.C2CPushRequestMessage;
import com.timberliu.chat.server.protocol.message.c2c.C2CSendRequestMessage;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author liujie
 * @date 2021/9/29
 */
@Mapper
public interface MessageConvert {

	MessageConvert INSTANCE = Mappers.getMapper(MessageConvert.class);

	HistoryMsgEntity convert(MessageStorageDTO messageStorageDTO);

	MessageStorageDTO convertStorage(C2CSendRequestMessage c2CSendRequestMessage);

	C2CPushRequestMessage convertPush(C2CSendRequestMessage c2CSendRequestMessage);

}
