package com.timberliu.chat.server.auth;

import java.lang.annotation.*;

/**
 * 注解 @NotRequireAuth 的 Controller 接口，无需进行登录
 *
 * @author liujie
 * @date 2021/9/24
 */
@Documented
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotRequireAuth {

}
