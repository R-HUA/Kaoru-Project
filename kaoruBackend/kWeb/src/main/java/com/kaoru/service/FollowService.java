package com.kaoru.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.kaoru.pojo.Follow;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.pojo.User;
import com.kaoru.utils.ResponseResult;
import com.kaoru.vo.UserInfoVo;

import java.util.List;

/**
* 针对表【t_follow(关注表)】的数据库操作Service
*/
public interface FollowService extends IService<Follow> {

    List<Long> getFollowingList(Long id);

    List<Long> getFollowerList(Long id);


    List<UserInfoVo> getFollowingUserList(Long id);

    ResponseResult getFollowerUserList(Long id);

    ResponseResult addFollow(Long followeeId);

    ResponseResult deleteFollow(Long followeeId);
}
