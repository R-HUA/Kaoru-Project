package com.kaoru.controller;


import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.pojo.Post;
import com.kaoru.service.PostService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PreventDuplicate
    @AppLog
    @GetMapping("/post/{id}")
    public ResponseResult getPostContent(@PathVariable(name = "id") Long id){
        return postService.getPostContent(id);
    }

    @PreventDuplicate
    @AppLog
    @GetMapping("/postList/{userId}/{pageNum}")
    public ResponseResult getUserPostList(@PathVariable(name = "userId", required = false) Long userId,@PathVariable(name = "pageNum") Integer pageNum, Integer pageSize){
        return postService.getUserPostList(pageNum, pageSize, userId);
    }

    @PreventDuplicate
    @AppLog
    @GetMapping("/postList/following/{pageNum}")
    public ResponseResult getAllFollowingPost(@PathVariable(name = "pageNum", required = false) Integer pageNum, Integer pageSize){
        return postService.getFollowingPostList(pageNum, pageSize);
    }

    @PreventDuplicate
    @AppLog
    @PostMapping("/post")
    public ResponseResult addPost(@RequestBody Post post){
        return postService.newPost(post);
    }

    @PreventDuplicate
    @AppLog
    @DeleteMapping("/post/{id}")
    public ResponseResult deletePost(@PathVariable(name = "id") Long id){
        return postService.deletePost(id);
    }


    @AppLog
    @PreventDuplicate
    @PutMapping("/post/{id}/view")
    public ResponseResult updateViewCount(@PathVariable(name = "id") Long id){
        postService.updateViewCount(id);
        return ResponseResult.okResult();
    }
}
