package com.kaoru.utils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.kaoru.enmus.CustomedHttpCodeEnum;

import java.io.Serializable;


/**
 * The standard response result in this project
 * Warp the actual data with code and message
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseResult implements Serializable {
    private Integer code;
    private String msg;
    private Object data;

    public ResponseResult() {
        this.code = CustomedHttpCodeEnum.SUCCESS.getCode();
        this.msg = CustomedHttpCodeEnum.SUCCESS.getMsg();
    }

    public ResponseResult(Integer code, Object data) {
        this.code = code;
        this.data = data;
    }

    public ResponseResult(Integer code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static ResponseResult errorResult(int code, String msg) {
        ResponseResult result = new ResponseResult();
        return result.error(code, msg);
    }
    public static ResponseResult okResult() {
        ResponseResult result = new ResponseResult();
        return result;
    }
    public static ResponseResult okResult(int code, String msg) {
        ResponseResult result = new ResponseResult();
        return result.ok(code, null, msg);
    }

    public static ResponseResult okResult(Object data) {
        ResponseResult result = setHttpCodeEnum(CustomedHttpCodeEnum.SUCCESS, CustomedHttpCodeEnum.SUCCESS.getMsg());
        if(data!=null) {
            result.setData(data);
        }
        return result;
    }

    public static ResponseResult errorResult(CustomedHttpCodeEnum enums){
        return setHttpCodeEnum(enums,enums.getMsg());
    }

    public static ResponseResult errorResult(CustomedHttpCodeEnum enums, String msg){
        return setHttpCodeEnum(enums,msg);
    }

    public static ResponseResult setHttpCodeEnum(CustomedHttpCodeEnum enums){
        return okResult(enums.getCode(),enums.getMsg());
    }

    private static ResponseResult setHttpCodeEnum(CustomedHttpCodeEnum enums, String msg){
        return okResult(enums.getCode(),msg);
    }

    public ResponseResult error(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
        return this;
    }

    public ResponseResult ok(Integer code, Object data) {
        this.code = code;
        this.data = data;
        return this;
    }

    public ResponseResult ok(Integer code, Object data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
        return this;
    }

    public ResponseResult ok(Object data) {
        this.data = data;
        return this;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }



}