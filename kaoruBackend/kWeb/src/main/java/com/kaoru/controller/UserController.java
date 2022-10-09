package com.kaoru.controller;

import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.User;
import com.kaoru.service.UserService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * UserController
 * &#064;auther  H
 */
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){


        if (user != null && StringUtils.hasText(user.getUserName()) ){
            return userService.login(user);
        }

        throw new AppSystemException(CustomedHttpCodeEnum.REQUIRE_USERNAME);
    }

    @PostMapping("/logout")
    public ResponseResult logout(){
        return userService.logout();
    }

    @GetMapping("/user/info")
    public ResponseResult getUserInfo(){
        return userService.getUserInfo();
    }
}
