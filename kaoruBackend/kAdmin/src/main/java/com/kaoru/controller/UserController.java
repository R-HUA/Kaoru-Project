package com.kaoru.controller;


import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.User;
import com.kaoru.service.UserService;
import com.kaoru.utils.ResponseResult;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserService userService;

    @RequestMapping("/user/login")
    public ResponseResult login(@RequestBody User user){
        if (user != null && StringUtils.hasText(user.getUserName()) ){
            return userService.adminLogin(user);
        }
        throw new AppSystemException(CustomedHttpCodeEnum.REQUIRE_USERNAME);
    }
}
