package com.timberliu.chat.server.generator;

import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;
import com.timberliu.chat.server.dao.BaseEntity;

import java.util.ArrayList;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/22
 */

public class TChatAutoGenerator {

	public static void main(String[] args) {
		AutoGenerator mpg = new AutoGenerator();

		// 全局配置
		GlobalConfig gc = new GlobalConfig();
		String projectPath = System.getProperty("user.dir");
		gc.setOutputDir(projectPath + "/chat-server/src/main/java");
		gc.setAuthor("liujie");
		gc.setOpen(false);
		gc.setEntityName("%sEntity");
		mpg.setGlobalConfig(gc);

		// 数据源配置
		DataSourceConfig dsc = new DataSourceConfig();
		dsc.setUrl("jdbc:mysql://123.56.9.126:3306/t_chat?useUnicode=true&useSSL=false&characterEncoding=utf8");
		dsc.setDriverName("com.mysql.jdbc.Driver");
		dsc.setUsername("root");
		dsc.setPassword("WfNYnraEOynLn87e");
		mpg.setDataSource(dsc);

		// 包配置
		PackageConfig pc = new PackageConfig();
		pc.setParent("com.timberliu.chat.server");
		pc.setEntity("dao.mysql.entity");
		pc.setMapper("dao.mysql.mapper");
		mpg.setPackageInfo(pc);

		// 自定义配置
		InjectionConfig cfg = new InjectionConfig() {
			@Override
			public void initMap() {
				// to do nothing
			}
		};

		// 如果模板引擎是 freemarker
//		String templatePath = "/templates/mapper.xml.ftl";
		// 如果模板引擎是 velocity
		 String templatePath = "/templates/mapper.xml.vm";

		// 自定义输出配置
		List<FileOutConfig> focList = new ArrayList<>();
//		 自定义配置会被优先输出
		focList.add(new FileOutConfig(templatePath) {
			@Override
			public String outputFile(TableInfo tableInfo) {
				// 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
				return projectPath + "/chat-server/src/main/resources/mappers/"
						+ tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
			}
		});
//        cfg.setFileCreate(new IFileCreate() {
//            @Override
//            public boolean isCreate(ConfigBuilder configBuilder, FileType fileType, String filePath) {
//                // 判断自定义文件夹是否需要创建
//                checkDir("调用默认方法创建的目录，自定义目录用");
//                if (fileType == FileType.MAPPER) {
//                    // 已经生成 mapper 文件判断存在，不想重新生成返回 false
//                    return !new File(filePath).exists();
//                }
//                // 允许生成模板文件
//                return true;
//            }
//        });

		cfg.setFileOutConfigList(focList);
		mpg.setCfg(cfg);

		TemplateConfig templateConfig = new TemplateConfig();

		// 配置自定义输出模板
		//指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
		// templateConfig.setEntity("templates/entity2.java");
		templateConfig.setService("");
		templateConfig.setServiceImpl("");
		templateConfig.setController("");
		templateConfig.setXml(null);
		mpg.setTemplate(templateConfig);

		// 策略配置
		StrategyConfig strategy = new StrategyConfig();
		strategy.setNaming(NamingStrategy.underline_to_camel);
		strategy.setColumnNaming(NamingStrategy.underline_to_camel);
		strategy.setSuperEntityClass(BaseEntity.class, NamingStrategy.underline_to_camel);
		strategy.setEntityLombokModel(true);
		strategy.setRestControllerStyle(false);
		// 公共父类
//		strategy.setSuperControllerClass("你自己的父类控制器,没有就不用设置!");
		// 写于父类中的公共字段
		strategy.setSuperEntityColumns("create_time", "update_time");
//		strategy.setInclude("user_info", "user_relation", "group_info", "group_user_relation", "history_msg_single", "history_msg_group");
		strategy.setInclude("history_msg", "talk_info", "group_info");
//		strategy.setControllerMappingHyphenStyle(true);
//		strategy.setTablePrefix(pc.getModuleName() + "_");
		mpg.setStrategy(strategy);
		mpg.setTemplateEngine(new VelocityTemplateEngine());
		mpg.execute();
	}
}
