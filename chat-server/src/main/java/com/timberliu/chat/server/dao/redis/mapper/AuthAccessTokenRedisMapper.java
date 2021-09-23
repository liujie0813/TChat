package com.timberliu.chat.server.dao.redis.mapper;

import com.alibaba.fastjson.JSON;
import com.timberliu.chat.server.dao.redis.RedisKeyEnum;
import com.timberliu.chat.server.dao.redis.RedisKeyTypeEnum;
import com.timberliu.chat.server.dao.redis.entity.AuthAccessTokenEntity;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

import static com.timberliu.chat.server.dao.redis.RedisKeyEnum.AUTH_ACCESS_TOKEN;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Repository
public class AuthAccessTokenRedisMapper {

	@Resource
	private StringRedisTemplate redisTemplate;

	public AuthAccessTokenEntity get(String accessToken) {
		String redisKey = formatKey(accessToken);
		String tokenStr = redisTemplate.opsForValue().get(redisKey);
		return JSON.parseObject(tokenStr, AuthAccessTokenEntity.class);
	}

	public void set(AuthAccessTokenEntity tokenEntity) {
		String redisKey = formatKey(tokenEntity.getAccessToken());
		redisTemplate.opsForValue().set(redisKey, JSON.toJSONString(tokenEntity), AUTH_ACCESS_TOKEN.getTimeout());
	}

	public void delete(String accessToken) {
		String redisKey = formatKey(accessToken);
		redisTemplate.delete(redisKey);
	}

	private static String formatKey(String accessToken) {
		return String.format(AUTH_ACCESS_TOKEN.getKeyTemplate(), accessToken);
	}

}
