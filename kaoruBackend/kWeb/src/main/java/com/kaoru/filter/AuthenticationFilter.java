package com.kaoru.filter;

import com.alibaba.fastjson.JSON;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.utils.*;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *  Authentication filter
 *  If JWT token is valid, set authentication in security context
 *
 */
@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // get token from header
        String token = request.getHeader("token");
        String result = null;

        // if token is null, do nothing
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // if token is valid, set authentication in security context
            Claims claims = JwtUtil.parseJWT(token);
            String uid = claims.getSubject();
            LoginUserDetails loginUser = redisCache.getCacheObject("login:" + uid);
            if (loginUser != null) {
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(loginUser, null, null));
            }
            filterChain.doFilter(request, response);
            return;
        } catch (Exception e) {
            logger.warn(e.getMessage());
            result = JSON.toJSONString(ResponseResult.errorResult(CustomedHttpCodeEnum.SYSTEM_ERROR, e.getMessage()));
            WebUtils.renderString(response, result);
        }

        // if token is invalid, return error message in body to client
        // (HTTP Status is 200, It is just a customized error message for client)
        result = JSON.toJSONString(ResponseResult.errorResult(CustomedHttpCodeEnum.NEED_LOGIN));



        WebUtils.renderString(response, result);
    }
}
