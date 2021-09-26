package com.timberliu.chat.server.dao.mysql.mapper;

import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgGroupEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * 历史消息(群聊)表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Repository
public interface HistoryMsgGroupMapper extends BaseMapper<HistoryMsgGroupEntity> {

}
