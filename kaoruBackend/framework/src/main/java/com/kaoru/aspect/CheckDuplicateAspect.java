package com.kaoru.aspect;

import com.alibaba.fastjson.JSON;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.utils.RedisCache;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Aspect
@Component
@Slf4j
public class CheckDuplicateAspect {

    @Autowired
    private RedisCache redisCache;

    @Pointcut("@annotation(com.kaoru.annotation.PreventDuplicate)")
    public void prevent(){}

    @Around("prevent()")
    public Object checkDuplicate(ProceedingJoinPoint joinPoint) throws Throwable{

        log.info("CheckDuplicateAspect");

        String methodName = joinPoint.getSignature().getName();

        String args = Arrays.toString(joinPoint.getArgs());


        String requestDetails = methodName + ": " + args;

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null){
            HttpServletRequest request = requestAttributes.getRequest();
            String token = request.getHeader("token");
            if (token != null){
                requestDetails = requestDetails + ": " + token;
            }
        }

        if (redisCache.getCacheObject(requestDetails) != null){
            log.error(methodName);
            throw new AppSystemException(CustomedHttpCodeEnum.PARAMETER_ERROR.getCode(),"Duplicate request detected");
        }
        else {
            redisCache.setCacheObject(requestDetails,"true");
            redisCache.expire(requestDetails,5);
        }


        return joinPoint.proceed();
    }

}
