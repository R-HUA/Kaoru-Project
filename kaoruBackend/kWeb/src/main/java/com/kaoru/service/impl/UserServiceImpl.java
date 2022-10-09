package com.kaoru.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    @Override
    public ResponseResult login(User user) {


        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());
        Authentication authenticate = authenticationManager.authenticate(token);
        LoginUserDetails loginUser = (LoginUserDetails) authenticate.getPrincipal();
        String uid = loginUser.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(uid);
        redisCache.setCacheObject("login:"+ uid, loginUser);

        UserInfoVo userInfoVo = BeanCopyUtils.copyBean(loginUser.getUser(), UserInfoVo.class);

        return ResponseResult.okResult(new LoginVo(jwt,userInfoVo));
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

}





