package com.kaoru.controller;


import com.kaoru.pojo.Post;
import com.kaoru.service.PostService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    @Autowired
    private PostService postService;


    @GetMapping("/post/{id}")
    public ResponseResult getPostContent(@PathVariable(name = "id") Long id){
        return postService.getPostContent(id);
    }


    @GetMapping("/postList/{userId}/{pageNum}")
    public ResponseResult getUserPostList(@PathVariable(name = "userId") Long userId,@PathVariable(name = "pageNum") Integer pageNum, Integer pageSize){
        return postService.getUserPostList(pageNum, pageSize, userId);
    }

    @GetMapping("/postList/all/{pageNum}")
    public ResponseResult getAllFollowingPost(@PathVariable(name = "pageNum") Integer pageNum, Integer pageSize){
        return postService.getFollowingPostList(pageNum, pageSize);
    }

    @PostMapping("/post")
    public ResponseResult addPost(@RequestBody Post post){
        return postService.newPost(post);
    }

    @DeleteMapping("/post/{id}")
    public ResponseResult deletePost(@PathVariable(name = "id") Long id){
        return postService.deletePost(id);
    }
}
