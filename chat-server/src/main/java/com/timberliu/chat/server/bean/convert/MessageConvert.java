package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.msg.MessageStorageDTO;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
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

}
