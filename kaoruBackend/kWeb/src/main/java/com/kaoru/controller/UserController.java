package com.kaoru.controller;

import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.User;
import com.kaoru.service.UserService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * UserController
 *
 */
@RestController
public class UserController {
    @Autowired
    private UserService userService;


    /**
     * 用户登录
     *
     * @return 包含LoginVo的结果
     */
    @AppLog
    @PreventDuplicate
    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){


        if (user != null && StringUtils.hasText(user.getUserName()) ){
            return userService.needInfoLogin(user);
        }

        throw new AppSystemException(CustomedHttpCodeEnum.REQUIRE_USERNAME);
    }

    /**
     * 用户登出
     * 删除redis中的token
     */
    @AppLog
    @PostMapping("/logout")
    public ResponseResult logout(){
        return userService.logout();
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/user")
    public ResponseResult getCurrentUserInfo(){
        return userService.getUserInfo();
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/user/{id}")
    public ResponseResult getUserInfoById(@PathVariable("id") Long id){
        return ResponseResult.okResult(userService.getUserInfoById(id));
    }

    @AppLog
    @PreventDuplicate
    @PutMapping("/userInfo")
    public ResponseResult updateUserInfo(@RequestBody User user){
        return userService.updateUserInfo(user);
    }

    @AppLog
    @PostMapping("/user")
    public ResponseResult register(@RequestBody User user){
        return userService.register(user);
    }


    /**
     * 更新用户信息
     *
     * @return 更新后的用户信息
     */
    @AppLog
    @PreventDuplicate
    @PutMapping("/user")
    public ResponseResult updateUser(
            @RequestParam(name = "avatar", required = false) MultipartFile avatar,
            @RequestParam(name = "header", required = false) MultipartFile header,
            @RequestParam(name = "nickName", required = false) String nickName,
            @RequestParam(name = "signature", required = false) String signature,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "phone",required = false) String phone){

        return userService.updateUserAndUpload(avatar,header,nickName,signature,email,phone);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/user/userList/{page}")
    public ResponseResult getUserList(@PathVariable("page") Integer pageNum, @RequestParam(name = "size", required = false) Integer pageSize){
        return userService.getUserList(pageNum,pageSize);
    }
}
