package com.timberliu.chat.server.dao.mysql.mapper;

import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * 历史消息表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-27
 */
@Repository
public interface HistoryMsgMapper extends BaseMapper<HistoryMsgEntity> {

}
