package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.chat.RecordDTO;
import com.timberliu.chat.server.bean.dto.chat.TalkDTO;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.timberliu.chat.server.dao.mysql.po.TalkInfoPO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author liujie
 * @date 2021/9/27
 */
@Mapper
public interface TalkConvert {

	TalkConvert INSTANCE = Mappers.getMapper(TalkConvert.class);

	List<TalkDTO> convert(List<TalkInfoPO> talkInfoPo);

	@Mapping(source = "id", target = "msgId")
	RecordDTO convert(HistoryMsgEntity historyMsgEntity);

}
