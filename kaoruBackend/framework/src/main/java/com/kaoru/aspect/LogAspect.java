package com.kaoru.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Component
@Slf4j
public class LogAspect {

    @Pointcut( "@annotation(com.kaoru.annotation.AppLog)")
    public void pointcut(){

    }

    @Around("pointcut()")
    public Object aroundLog(ProceedingJoinPoint joinPoint) throws Throwable{

        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();



        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();

            log.info(System.lineSeparator() + "==== Start of " + method.getName() + " ====" + System.lineSeparator() +
            " URL: \t" + request.getRequestURL() + System.lineSeparator() +
            " HTTP_METHOD: \t" + request.getMethod() + System.lineSeparator() +
            " IP: \t" + request.getRemoteHost() + System.lineSeparator() +
            " CLASS_METHOD: \t" + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName() + System.lineSeparator() +
            " ARGS: \t " + Arrays.toString(joinPoint.getArgs()));
        }

        Object result;
        try {
            result = joinPoint.proceed();
            log.info(System.lineSeparator() + " RESPONSE: \t" + result.toString());

        }finally {
            log.info(System.lineSeparator() + "==== End of " + joinPoint.getSignature().getName() + " ====" + System.lineSeparator());
        }
        return result;
    }
}
