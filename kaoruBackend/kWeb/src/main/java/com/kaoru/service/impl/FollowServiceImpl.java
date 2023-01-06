package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.Follow;
import com.kaoru.pojo.User;
import com.kaoru.service.FollowService;
import com.kaoru.mapper.FollowMapper;
import com.kaoru.service.UserService;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.ResponseResult;
import com.kaoru.utils.WebUtils;
import com.kaoru.vo.UserInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    /**
     * 通过UserService获取关注列表
     * @param id 用户id
     * @return 关注列表
     */
    @Override
    public List<UserInfoVo> getFollowingUserList(Long id) {
        List<Long> followingList = getFollowingList(id);

        List<UserInfoVo> userInfoList = new ArrayList<>();

        if (!followingList.isEmpty()){

            List<User> users = userService.listByIds(followingList);

            userInfoList = BeanCopyUtils.copyBeanList(users, UserInfoVo.class);
        }

        return userInfoList;
    }

    /**
     * 通过UserService获取粉丝列表
     * @param id 用户id
     * @return 粉丝列表
     */
    @Override
    public ResponseResult getFollowerUserList(Long id) {
        List<Long> followerList = getFollowerList(id);

        if (followerList.isEmpty()){
            return ResponseResult.okResult(new ArrayList<>());
        }

        List<User> users = userService.listByIds(followerList);
        List<UserInfoVo> userInfoList = BeanCopyUtils.copyBeanList(users, UserInfoVo.class);
        return ResponseResult.okResult(userInfoList);
    }

    /**
     * 添加关注
     * @param followeeId 被关注者id
     * @return 操作结果
     */
    @Override
    public ResponseResult addFollow(Long followeeId) {
        Long userId = WebUtils.getUserIDFromSecurityContext();
        LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Follow::getFollowerId, userId);
        queryWrapper.eq(Follow::getFolloweeId, followeeId);
        Follow follow = this.getOne(queryWrapper);

        if (follow != null) {
            throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),"Already followed");
        }
        else {
            User followee = userService.getById(followeeId);
            if (followee == null) {
                throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),"User does not exist");
            }
            follow = new Follow();
            follow.setFollowerId(userId);
            follow.setFolloweeId(followeeId);
            this.save(follow);
            return ResponseResult.okResult();
        }
    }

    /**
     * 取消关注
     * @param followeeId 被关注者id
     * @return 操作结果
     */
    @Override
    public ResponseResult deleteFollow(Long followeeId) {
        Long userId = WebUtils.getUserIDFromSecurityContext();
        LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Follow::getFollowerId, userId);
        queryWrapper.eq(Follow::getFolloweeId, followeeId);
        boolean removeResult = this.remove(queryWrapper);
        if (removeResult) {
            return ResponseResult.okResult();
        }
        else {
            throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),"Failed to unfollow");
        }
    }
}




