package com.timberliu.chat.server.config;

import com.timberliu.chat.server.auth.AuthInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author liujie
 * @date 2021/9/23
 */
@Slf4j
@Configuration
@AutoConfigureAfter(CommonWebAutoConfig.class)
public class WebSecurityConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authInterceptor())
				.excludePathPatterns("/user/login")
				.excludePathPatterns("/doc.html")
				.excludePathPatterns("/swagger-resources")
				.excludePathPatterns("/webjars/**")
				.excludePathPatterns("/swagger-resources/**");
	}

	@Bean
	public AuthInterceptor authInterceptor() {
		return new AuthInterceptor();
	}
}
