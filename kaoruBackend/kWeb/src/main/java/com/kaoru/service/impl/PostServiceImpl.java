package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.Post;
import com.kaoru.service.FollowService;
import com.kaoru.service.PostService;
import com.kaoru.mapper.PostMapper;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.RedisCache;
import com.kaoru.utils.ResponseResult;
import com.kaoru.utils.WebUtils;
import com.kaoru.vo.PageVO;
import com.kaoru.vo.PostVo;
import com.kaoru.vo.UserInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.kaoru.AppConstants.POST_STATUS_NORMAL;

/**
* 针对表【t_post(动态)】的数据库操作Service实现
*/
@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements PostService{

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private FollowService followService;

    @Autowired
    private PostMapper postMapper;

    @Override
    public ResponseResult getPostContent(Long id) {
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getId, id);
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);
        Post post = getOne(wrapper);
        //Post post = postMapper.selectPostById(id);

        if (post.getRepostId() != null) {
            Post repost = getById(post.getRepostId());
            if (repost != null && repost.getStatus().equals(POST_STATUS_NORMAL)) {
                post.setRepost(repost);
            }
        }

        PostVo postVo = BeanCopyUtils.copyBean(post, PostVo.class);




        try {
            postVo.setViewCount(((Integer)redisCache.getCacheMapValue("post:viewCounts", String.valueOf(id))).longValue());
            updateViewCount(id);
        } catch (Exception e) {
            log.error("Get view count of post from redis failed: " + e.getMessage());
        }

        return ResponseResult.okResult(postVo);
    }

    @Override
    public Boolean updateViewCount(Long id){
        redisCache.incrementCacheMapValue("post:viewCounts", String.valueOf(id), 1);
        return true;
    }

    @Override
    public ResponseResult newPost(Post post) {
        if (post.hasContent() && post.getContent().length() <= 500){
            boolean isSave = save(post);

            if (isSave){
                // return the added post
                PostVo postVo = BeanCopyUtils.copyBean(post, PostVo.class);
                return ResponseResult.okResult(postVo);
            }
        }

        throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);
    }

    @Override
    public ResponseResult deletePost(Long id) {
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getCreateBy, WebUtils.getUserIDFromSecurityContext());
        wrapper.eq(Post::getId,id);

        boolean remove = remove(wrapper);

        if (remove){
            return ResponseResult.okResult();
        }

        throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);
    }

    private ResponseResult getPostListPage(Integer pageNum, Integer pageSize, LambdaQueryWrapper<Post> wrapper, Map<Long,UserInfoVo> usersMap) {


        // Validate pageNum and pageSize
        pageNum = (pageNum != null && pageNum > 0) ? pageNum : 1;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        // Order
        wrapper.orderByDesc(Post::getIsTop);
        wrapper.orderByDesc(Post::getCreateTime);

        // Page
        Page<Post> postPage = new Page<>(pageNum, pageSize);
        this.page(postPage, wrapper);
        List<Post> thisPage = postPage.getRecords();
        List<PostVo> postVos = BeanCopyUtils.copyBeanList(thisPage, PostVo.class);

        // set view count and poster
        postVos.forEach(postVo -> {
            try {
                postVo.setViewCount(((Integer)redisCache.getCacheMapValue("post:viewCounts", String.valueOf(postVo.getId()))).longValue());
            } catch (Exception e){
                log.error("Get view count of post from redis failed: " + e.getMessage());
            }

            if (usersMap != null){
                postVo.setPoster(usersMap.get(postVo.getCreateBy()));
            }
        });


        return ResponseResult.okResult(new PageVO(postVos, postPage.getTotal()));
    }

    @Override
    public ResponseResult getUserPostList(Integer pageNum, Integer pageSize, Long userId) {

        // query conditions
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getCreateBy, userId);
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);


        return getPostListPage(pageNum, pageSize, wrapper, null);

    }

    @Override
    public ResponseResult getFollowingPostList(Integer pageNum, Integer pageSize) {

        Long id = WebUtils.getUserIDFromSecurityContext();

        List<UserInfoVo> followingUserList = followService.getFollowingUserList(id);

        if (followingUserList.isEmpty()){
            return ResponseResult.okResult(new PageVO(null,0L));
        }

        Map<Long, UserInfoVo> followingUserMap = followingUserList.stream()
                .collect(Collectors.toMap(UserInfoVo::getId, userInfoVo -> userInfoVo));



        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);
        wrapper.in(Post::getCreateBy, followingUserMap.keySet());


        return getPostListPage(pageNum, pageSize, wrapper,followingUserMap);
    }
}




