package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.UserInfoDTO;
import com.timberliu.chat.server.bean.dto.UserLoginReqDTO;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import org.apache.ibatis.annotations.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Mapper
public interface UserConvert {

	UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);

	UserInfoDTO convert(UserInfoEntity userInfoEntity);

	UserInfoEntity convert(UserLoginReqDTO userLoginReqDTO);

}
