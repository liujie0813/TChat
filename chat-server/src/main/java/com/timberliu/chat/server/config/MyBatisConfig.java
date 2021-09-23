package com.timberliu.chat.server.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author Timber
 * @date 2021/9/24
 */
@Configuration
@MapperScan("com.timberliu.chat.server.dao.mysql.mapper")
public class MyBatisConfig {

}
