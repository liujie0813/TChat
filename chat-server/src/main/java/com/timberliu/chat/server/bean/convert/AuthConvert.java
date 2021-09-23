package com.timberliu.chat.server.bean.convert;

import com.timberliu.chat.server.bean.dto.AuthAccessTokenRespDTO;
import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author Timber
 * @date 2021/9/23
 */
@Mapper
public interface AuthConvert {

	AuthConvert INSTANCE = Mappers.getMapper(AuthConvert.class);

	AuthAccessTokenRespDTO convert(AuthAccessTokenEntity authAccessTokenEntity);
}
