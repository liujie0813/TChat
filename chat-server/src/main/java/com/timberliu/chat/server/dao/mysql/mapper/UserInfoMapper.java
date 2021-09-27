package com.timberliu.chat.server.dao.mysql.mapper;

import com.timberliu.chat.server.dao.mysql.entity.UserInfoEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.dao.mysql.po.TalkInfoPO;
import org.apache.ibatis.annotations.Param;

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
public interface UserInfoMapper extends BaseMapper<UserInfoEntity> {

	List<TalkInfoPO> getUserTalkInfos(@Param("userId") Long userId, @Param("talkIds") Set<Long> talkIds);

}
