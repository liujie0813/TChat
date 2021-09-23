package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.dao.mysql.entity.AuthRefreshTokenEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * 刷新令牌表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-24
 */
@Repository
public interface AuthRefreshTokenMapper extends BaseMapper<AuthRefreshTokenEntity> {

	default int deleteByUserId(Long userId) {
		return delete(new QueryWrapper<AuthRefreshTokenEntity>().eq("user_id", userId));
	}

	default AuthRefreshTokenEntity selectByRefreshToken(String refreshToken) {
		return selectOne(new QueryWrapper<AuthRefreshTokenEntity>().eq("refresh_token", refreshToken));
	}

}
