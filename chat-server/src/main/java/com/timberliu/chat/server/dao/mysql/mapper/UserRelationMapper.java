package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.timberliu.chat.server.bean.dto.ContactDTO;
import com.timberliu.chat.server.dao.mysql.entity.UserRelationEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 * 好友关系表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Repository
public interface UserRelationMapper extends BaseMapper<UserRelationEntity> {

	default UserRelationEntity getByUserId(Long mainUserId, Long subUserId) {
		return selectOne(new QueryWrapper<UserRelationEntity>()
				.eq("main_user_id", mainUserId).eq("sub_user_id", subUserId));
	}

	List<ContactDTO> getContactList(Long userId);
}
