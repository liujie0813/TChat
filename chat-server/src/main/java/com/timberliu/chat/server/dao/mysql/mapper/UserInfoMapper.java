package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.timberliu.chat.server.dao.mysql.po.TalkInfoPO;
import com.timberliu.chat.server.dao.mysql.po.UserFromInfoPO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.Set;

/**
 * <p>
 * 用户信息表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Repository
public interface UserInfoMapper extends BaseMapper<UserInfoEntity> {

	default UserInfoEntity searchByAccount(String account) {
		return selectOne(new QueryWrapper<UserInfoEntity>().eq("account", account));
	}

	List<TalkInfoPO> getUserTalkInfos(@Param("userId") Long userId, @Param("talkIds") Set<Long> talkIds);

	List<UserFromInfoPO> getUserFromInfos(@Param("toId") Long toId, @Param("fromIds") Set<Long> fromIds);

}
