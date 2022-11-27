package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.User;
import com.kaoru.service.UserService;
import com.kaoru.mapper.UserMapper;
import com.kaoru.utils.*;
import com.kaoru.vo.LoginVo;
import com.kaoru.vo.UserInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 针对表【t_user(用户表)】的数据库操作Service实现
 * @author H
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService{
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public ResponseResult login(User user, Boolean isNeedInfo) {


        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());
        Authentication authenticate = authenticationManager.authenticate(token);
        LoginUserDetails loginUser = (LoginUserDetails) authenticate.getPrincipal();
        String uid = loginUser.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(uid);


        if (isNeedInfo){
            redisCache.setCacheObject("login:"+ uid, loginUser);
            UserInfoVo userInfoVo = BeanCopyUtils.copyBean(loginUser.getUser(), UserInfoVo.class);
            return ResponseResult.okResult(new LoginVo(jwt,userInfoVo));
        }
        else {
            Map<String,String> jwtmap = new HashMap<>();
            jwtmap.put("token",jwt);

            redisCache.setCacheObject("AdminLogin:"+ uid, loginUser);
            return ResponseResult.okResult(jwtmap);
        }


    }

    @Override
    public ResponseResult needInfoLogin(User user) {
        return login(user,true);
    }

    @Override
    public ResponseResult adminLogin(User user) {
        return login(user,false);
    }

    @Override
    public ResponseResult logout() {

        Long id = WebUtils.getUserIDFromSecurityContext();

        // delete user from redis
        redisCache.deleteObject("login:"+id);

        return ResponseResult.okResult();
    }

    /**
     * Get user info from redis.
     * It requires the user to be logged in
     *
     * @return user info warped in ResponseResult
     */
    @Override
    public ResponseResult getUserInfo() {
        Long id = WebUtils.getUserIDFromSecurityContext();
        LoginUserDetails loginUser = redisCache.getCacheObject("login:" + id);
        UserInfoVo userInfoVo = BeanCopyUtils.copyBean(loginUser.getUser(), UserInfoVo.class);
        return ResponseResult.okResult(userInfoVo);
    }


    /**
     * Update user info.
     * It requires the user to be logged in
     *
     * @param user user info
     * @return ResponseResult
     */
    @Override
    public ResponseResult updateUserInfo(User user) {
        // filter the properties that cannot be updated
        UserInfoVo userInfoVo = BeanCopyUtils.copyBean(user, UserInfoVo.class);
        user = BeanCopyUtils.copyBean(userInfoVo, User.class);

        Long id = WebUtils.getUserIDFromSecurityContext();
        if (id.equals(user.getId())){
            updateById(user);
            return ResponseResult.okResult();
        }
        return ResponseResult.errorResult(CustomedHttpCodeEnum.NEED_LOGIN);
    }

    @Override
    public ResponseResult register(User user) {
        // check required fields
        if (!StringUtils.hasText(user.getUserName()) || !StringUtils.hasText(user.getPassword()) || !StringUtils.hasText(user.getNickName())){
            return ResponseResult.errorResult(CustomedHttpCodeEnum.REQUIRE_USERNAME);
        }

        // check if the username is already exist
        checkUserName(user.getUserName());

        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));


        // insert into database
        save(user);

        return ResponseResult.okResult();
    }


    private void checkUserName(String userName){
        User user = getOne(new QueryWrapper<User>().eq("user_name", userName));
        if (user != null){
            throw new AppSystemException(CustomedHttpCodeEnum.USERNAME_EXIST);
        }
    }

}





