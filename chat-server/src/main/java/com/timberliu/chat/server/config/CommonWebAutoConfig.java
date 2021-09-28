package com.timberliu.chat.server.config;

import com.timberliu.chat.server.interceptor.AccessLogInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Configuration
@Slf4j
public class CommonWebAutoConfig implements WebMvcConfigurer {

	// ================ 全局处理器 =================

	@Bean
	@ConditionalOnMissingBean(GlobalResponseBodyHandler.class)
	public GlobalResponseBodyHandler globalResponseBodyHandler() {
		return new GlobalResponseBodyHandler();
	}

	@Bean
	@ConditionalOnMissingBean(GlobalExceptionHandler.class)
	public GlobalExceptionHandler globalExceptionHandler() {
		return new GlobalExceptionHandler();
	}

	// ================ 拦截器-访问日志 =================

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		try {
			registry.addInterceptor(accessLogInterceptor());
			log.info("[addInterceptors] load accessLogInterceptor complete");
		} catch (Exception e) {
			log.warn("[addInterceptors] load accessLogInterceptor failed", e);
		}
	}

	@Bean
	public AccessLogInterceptor accessLogInterceptor() {
		return new AccessLogInterceptor();
	}

	// ================= 过滤器-跨域 ==================

	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*");
		config.setAllowCredentials(true);
		config.addAllowedMethod("*");
		config.addAllowedHeader("*");

		UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
		configSource.registerCorsConfiguration("/**", config);

		return new CorsFilter(configSource);
	}

}
