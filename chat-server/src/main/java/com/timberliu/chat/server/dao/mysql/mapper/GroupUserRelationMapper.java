package com.timberliu.chat.server.dao.mysql.mapper;

import com.timberliu.chat.server.bean.dto.contact.GroupDTO;
import com.timberliu.chat.server.dao.mysql.entity.GroupUserRelationEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.bean.dto.contact.GroupMemberDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

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

	Integer batchInsert(List<GroupUserRelationEntity> groupUserRelationEntities);

	List<GroupDTO> getGroupInfoList(Long userId);

	List<GroupMemberDTO> getGroupMemberList(List<Long> groupIds);

}
