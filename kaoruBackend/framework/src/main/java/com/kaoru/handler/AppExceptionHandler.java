package com.kaoru.handler;


import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.utils.ResponseResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class AppExceptionHandler {

    @ExceptionHandler(AppSystemException.class)
    public ResponseResult HandleAppSystemException(AppSystemException e){
        log.error("AppSystemException at " + e.getStackTrace()[0] + "   " + e.getMessage());
        return ResponseResult.errorResult(e.getCode(),e.getMsg());
    }

/*    @ExceptionHandler(Exception.class)
    public ResponseResult HandleExceptions(Exception e){
        log.error("An Exception :  "+ e.getMessage(),e);
        return ResponseResult.errorResult(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),e.getMessage());
    }*/
}
