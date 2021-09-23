package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.dao.mysql.entity.AuthAccessTokenEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.dao.mysql.entity.AuthRefreshTokenEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 * 访问令牌表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-24
 */
@Repository
public interface AuthAccessTokenMapper extends BaseMapper<AuthAccessTokenEntity> {

	default AuthAccessTokenEntity selectByAccessToken(String accessToken) {
		return selectOne(new QueryWrapper<AuthAccessTokenEntity>().eq("access_token", accessToken));
	}

	default AuthAccessTokenEntity selectByUserId(Long userId) {
		return selectOne(new QueryWrapper<AuthAccessTokenEntity>().eq("user_id", userId));
	}

	default List<AuthAccessTokenEntity> selectListByRefreshToken(String refreshToken) {
		return selectList(new QueryWrapper<AuthAccessTokenEntity>().eq("refresh_token", refreshToken));
	}

}
