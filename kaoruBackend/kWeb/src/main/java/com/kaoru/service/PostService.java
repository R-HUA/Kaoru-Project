package com.kaoru.service;

import com.kaoru.pojo.Post;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.utils.ResponseResult;


/**
* 
*  针对表【t_post(动态)】的数据库操作Service
*/
public interface PostService extends IService<Post> {

    ResponseResult getPostContent(Long id);

    ResponseResult newPost(Post post);

    ResponseResult deletePost(Long id);

    ResponseResult getUserPostList(Integer pageNum, Integer pageSize, Long userId);

    ResponseResult getFollowingPostList(Integer pageNum, Integer pageSize);
}
