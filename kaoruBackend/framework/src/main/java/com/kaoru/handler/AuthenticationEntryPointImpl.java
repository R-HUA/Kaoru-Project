package com.kaoru.handler;


import com.alibaba.fastjson.JSON;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.utils.ResponseResult;
import com.kaoru.utils.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Logger log = LoggerFactory.getLogger(AuthenticationEntryPointImpl.class);
        log.warn("AuthException: " + authException.getMessage());

        ResponseResult responseResult = ResponseResult.errorResult(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),authException.getMessage());
        if (authException instanceof org.springframework.security.authentication.BadCredentialsException) {
            responseResult = ResponseResult.errorResult(
                    CustomedHttpCodeEnum.LOGIN_ERROR.getCode(),authException.getMessage());
        } else if (authException instanceof  org.springframework.security.authentication.InsufficientAuthenticationException) {
            responseResult = ResponseResult.errorResult(
                    CustomedHttpCodeEnum.NEED_LOGIN.getCode(),authException.getMessage());
        }

        WebUtils.renderString(response, JSON.toJSONString(responseResult));

    }
}

