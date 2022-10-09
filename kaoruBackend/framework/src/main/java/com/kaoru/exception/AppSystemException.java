package com.kaoru.exception;

import com.kaoru.enmus.CustomedHttpCodeEnum;

public class AppSystemException extends RuntimeException{
    private int code;

    private String msg;

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public AppSystemException(CustomedHttpCodeEnum httpCodeEnum) {
        super(httpCodeEnum.getMsg());
        this.code = httpCodeEnum.getCode();
        this.msg = httpCodeEnum.getMsg();
    }

    public AppSystemException(int code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
}
