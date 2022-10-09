package com.kaoru.service;

import com.kaoru.pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.utils.ResponseResult;

/**
 * 针对表【t_user(用户表)】的数据库操作Service
 * @author H
*/
public interface UserService extends IService<User> {
    /**
     * Login
     * @param user User
     * @return LoginVo
     */
    ResponseResult login(User user);

    ResponseResult logout();

    ResponseResult getUserInfo();
}
