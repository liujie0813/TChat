package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.contact.GroupDTO;
import com.timberliu.chat.server.dao.mysql.entity.GroupInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author liujie
 * @date 2021/10/11
 */
@Mapper
public interface GroupConvert {

	GroupConvert INSTANCE = Mappers.getMapper(GroupConvert.class);

	@Mapping(source = "id", target = "groupId")
	GroupDTO convert(GroupInfoEntity groupInfoEntity);
}
