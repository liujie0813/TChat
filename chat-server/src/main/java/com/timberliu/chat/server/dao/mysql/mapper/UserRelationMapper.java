package com.timberliu.chat.server.dao.mysql.mapper;

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

	List<ContactDTO> getContactList(Long userId);
}
