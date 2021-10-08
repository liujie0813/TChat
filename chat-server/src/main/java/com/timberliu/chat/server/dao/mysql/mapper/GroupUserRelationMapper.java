package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.dao.mysql.entity.GroupUserRelationEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 群组-用户关系表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Repository
public interface GroupUserRelationMapper extends BaseMapper<GroupUserRelationEntity> {

	List<Long> getByTalkId(Long talkId);

}
