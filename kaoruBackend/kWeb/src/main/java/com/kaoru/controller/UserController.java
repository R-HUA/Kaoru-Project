package com.kaoru.controller;

import com.kaoru.annotation.AppLog;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.User;
import com.kaoru.service.UserService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * UserController
 *
 */
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @AppLog
    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){


        if (user != null && StringUtils.hasText(user.getUserName()) ){
            return userService.needInfoLogin(user);
        }

        throw new AppSystemException(CustomedHttpCodeEnum.REQUIRE_USERNAME);
    }

    @AppLog
    @PostMapping("/logout")
    public ResponseResult logout(){
        return userService.logout();
    }

    @AppLog
    @GetMapping("/user")
    public ResponseResult getUserInfo(){
        return userService.getUserInfo();
    }

    @AppLog
    @PutMapping("/user")
    public ResponseResult updateUserInfo(@RequestBody User user){
        return userService.updateUserInfo(user);
    }

    @AppLog
    @PostMapping("/user")
    public ResponseResult register(@RequestBody User user){
        return userService.register(user);
    }
}
