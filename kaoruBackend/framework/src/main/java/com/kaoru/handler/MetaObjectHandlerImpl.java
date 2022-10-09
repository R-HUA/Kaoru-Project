package com.kaoru.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.kaoru.utils.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@Slf4j
public class MetaObjectHandlerImpl implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        Long userId;
        try {
            userId = WebUtils.getUserIDFromSecurityContext();
        } catch (Exception e) {
            log.warn("获取ID失败, Fail to get User ID from Context: " + e.getMessage());
            userId = -1L;    //表示非用户操作
        }
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("createBy",userId , metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
        this.setFieldValByName("updateBy", userId, metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime", new Date(), metaObject);
        this.setFieldValByName("updateBy", WebUtils.getUserIDFromSecurityContext(), metaObject);
    }
}
