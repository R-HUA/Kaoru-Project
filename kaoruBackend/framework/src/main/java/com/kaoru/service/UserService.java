package com.kaoru.service;

import com.kaoru.pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.utils.ResponseResult;
import com.kaoru.vo.UserInfoVo;
import org.springframework.web.multipart.MultipartFile;

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
    ResponseResult needInfoLogin(User user);

    ResponseResult adminLogin(User user);

    ResponseResult logout();

    ResponseResult getUserInfo();

    ResponseResult updateUserInfo(User user);

    ResponseResult register(User user);

    UserInfoVo getUserInfoById(Long id);

    ResponseResult updateUserAndUpload(MultipartFile avatar, MultipartFile header, String nickName, String signature, String email, String phone);

    ResponseResult getUserList(Integer pageNum, Integer pageSize);
}
