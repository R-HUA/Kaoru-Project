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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

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

    @Override
    public ResponseResult getPostContent(Long id) {
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getId, id);
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);
        Post post = getOne(wrapper);

        PostVo postVo = BeanCopyUtils.copyBean(post, PostVo.class);

        try {
            postVo.setViewCount(((Integer)redisCache.getCacheMapValue("post:viewCounts", String.valueOf(id))).longValue());
        } catch (Exception e) {
            log.error("Get view count of post from redis failed: " + e.getMessage());
        }

        return ResponseResult.okResult(postVo);
    }

    @Override
    public ResponseResult newPost(Post post) {
        if (StringUtils.hasText(post.getContent())){
            boolean isSave = save(post);
            if (isSave){
                return ResponseResult.okResult();
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

    private ResponseResult getPostListPage(Integer pageNum, Integer pageSize, LambdaQueryWrapper<Post> wrapper) {

        // Validate pageNum and pageSize
        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        // Order
        wrapper.orderByDesc(Post::getIsTop);
        wrapper.orderByDesc(Post::getCreateTime);

        // Page
        Page<Post> postPage = new Page<>(pageNum, pageSize);
        this.page(postPage, wrapper);
        List<Post> thisPage = postPage.getRecords();

        List<PostVo> postVos = BeanCopyUtils.copyBeanList(thisPage, PostVo.class);

        return ResponseResult.okResult(new PageVO(postVos, postPage.getTotal()));
    }

    @Override
    public ResponseResult getUserPostList(Integer pageNum, Integer pageSize, Long userId) {

        // query conditions
        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getCreateBy, userId);
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);


        return getPostListPage(pageNum, pageSize, wrapper);

    }

    @Override
    public ResponseResult getFollowingPostList(Integer pageNum, Integer pageSize) {

        Long id = WebUtils.getUserIDFromSecurityContext();

        List<Long> followingList = followService.getFollowingList(id);

        LambdaQueryWrapper<Post> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Post::getStatus, POST_STATUS_NORMAL);
        wrapper.in(Post::getCreateBy, followingList);

        return getPostListPage(pageNum, pageSize, wrapper);
    }
}




