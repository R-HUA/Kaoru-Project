package com.kaoru.controller;

import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kaoru.service.FollowService;

@RestController
public class FollowController {

    @Autowired
    private FollowService followService;

    @AppLog
    @PreventDuplicate
    @PostMapping("/follow/{followeeId}")
    public ResponseResult follow(@PathVariable("followeeId") Long followeeId) {
        return followService.addFollow(followeeId);
    }

    @AppLog
    @PreventDuplicate
    @DeleteMapping("/follow/{followeeId}")
    public ResponseResult unfollow(@PathVariable("followeeId") Long followeeId) {
        return followService.deleteFollow(followeeId);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/follower/{id}")
    public ResponseResult getFollowerUserList(@PathVariable("id") Long id) {
        return followService.getFollowerUserList(id);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/following/{id}")
    public ResponseResult getFollowingUserList(@PathVariable("id") Long id) {
        return ResponseResult.okResult(followService.getFollowingUserList(id));

    }

}
