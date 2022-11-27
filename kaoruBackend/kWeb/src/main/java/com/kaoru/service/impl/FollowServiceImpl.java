package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.pojo.Follow;
import com.kaoru.pojo.User;
import com.kaoru.service.FollowService;
import com.kaoru.mapper.FollowMapper;
import com.kaoru.service.UserService;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.ResponseResult;
import com.kaoru.vo.UserInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
*
* 针对表【t_follow(关注表)】的数据库操作Service实现
*/
@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements FollowService{


    @Autowired
    private UserService userService;

    /**
     * 获取关注列表
     * @param id 用户id
     * @return 关注id列表
     */
    @Override
    public List<Long> getFollowingList(Long id) {

        LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Follow::getFollowerId, id);

        List<Follow> followingRelations = this.list(queryWrapper);

        return followingRelations.stream()
                .map(Follow::getFolloweeId)
                .collect(Collectors.toList());
    }


    /**
     * 获取粉丝列表
     * @param id 用户id
     * @return 粉丝id列表
     */
    @Override
    public List<Long> getFollowerList(Long id) {

        LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Follow::getFolloweeId, id);

        List<Follow> followerRelations = this.list(queryWrapper);

        return followerRelations.stream()
                .map(Follow::getFollowerId)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseResult getFollowingUserList(Long id) {
        List<Long> followingList = getFollowingList(id);
        List<User> users = userService.listByIds(followingList);

        List<UserInfoVo> userInfoList = BeanCopyUtils.copyBeanList(users, UserInfoVo.class);


        return ResponseResult.okResult(userInfoList);


    }

    @Override
    public ResponseResult getFollowerUserList(Long id) {
        List<Long> followerList = getFollowerList(id);
        List<User> users = userService.listByIds(followerList);
        List<UserInfoVo> userInfoList = BeanCopyUtils.copyBeanList(users, UserInfoVo.class);
        return ResponseResult.okResult(userInfoList);
    }
}




