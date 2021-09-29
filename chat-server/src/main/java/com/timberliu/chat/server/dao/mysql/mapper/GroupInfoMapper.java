package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.dao.mysql.entity.GroupInfoEntity;
import com.timberliu.chat.server.dao.mysql.po.TalkInfoPO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

/**
 * <p>
 * 群组信息表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-27
 */
public interface GroupInfoMapper extends BaseMapper<GroupInfoEntity> {

	default GroupInfoEntity getByGroupId(Long groupId) {
		return selectOne(new QueryWrapper<GroupInfoEntity>().eq("group_id", groupId));
	}

	List<TalkInfoPO> getGroupTalkInfos(@Param("userId") Long userId, @Param("talkIds") Set<Long> talkIds);

}
