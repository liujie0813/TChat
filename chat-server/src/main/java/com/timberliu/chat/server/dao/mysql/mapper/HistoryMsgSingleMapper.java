package com.timberliu.chat.server.dao.mysql.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.timberliu.chat.server.dao.mysql.entity.HistoryMsgSingleEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * 历史消息(单聊)表 Mapper 接口
 * </p>
 *
 * @author liujie
 * @since 2021-09-23
 */
@Repository
public interface HistoryMsgSingleMapper extends BaseMapper<HistoryMsgSingleEntity> {

	IPage<HistoryMsgSingleEntity> selectPageByUserId(Page<HistoryMsgSingleEntity> page, Long userId);
}
