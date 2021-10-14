package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.timberliu.chat.server.bean.dto.contact.ApplyDTO;
import com.timberliu.chat.server.bean.enums.UserRelationStatusEnum;
import com.timberliu.chat.server.dao.mysql.entity.UserApplyEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 * 好友申请表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-10-14
 */
@Repository
public interface UserApplyMapper extends BaseMapper<UserApplyEntity> {

	default Integer updateApplyStatus(Long mainUserId, Long subUserId, UserRelationStatusEnum userRelationStatusEnum) {
		return update(new UserApplyEntity().setApplyStatus(userRelationStatusEnum),
				new UpdateWrapper<UserApplyEntity>().eq("main_user_id", mainUserId).eq("sub_user_id", subUserId));
	}

	default UserApplyEntity getByBothUserId(Long mainUserId, Long subUserId) {
		return selectOne(new QueryWrapper<UserApplyEntity>()
				.eq("main_user_id", mainUserId).eq("sub_user_id", subUserId));
	}

	List<ApplyDTO> getApplyList(Long userId);

}
