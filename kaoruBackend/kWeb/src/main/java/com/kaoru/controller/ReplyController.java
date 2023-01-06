package com.kaoru.controller;

import com.kaoru.AppConstants;
import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.pojo.Reply;
import com.kaoru.service.ReplyService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PreventDuplicate
    @AppLog
    @GetMapping("/article/replyList/{articleId}/{pageNum}")
    public ResponseResult articleReplyList(@PathVariable("articleId") Long articleId,
                                    @PathVariable("pageNum") Integer pageNum,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize){
        return replyService.replyList(AppConstants.REPLY_TYPE_ARTICLE, articleId, pageNum, pageSize);
    }

    @PreventDuplicate
    @AppLog
    @GetMapping("/post/replyList/{postId}/{pageNum}")
    public ResponseResult postReplyList(@PathVariable("postId") Long postId,
                                    @PathVariable("pageNum") Integer pageNum,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize){
        return replyService.replyList(AppConstants.REPLY_TYPE_POST, postId, pageNum, pageSize);
    }

    @PreventDuplicate
    @AppLog
    @PostMapping("/reply")
    public ResponseResult addReply(@RequestBody Reply reply){
        return replyService.addReply(reply);
    }

    @PreventDuplicate
    @AppLog
    @GetMapping("/reply/{rootId}/children")
    public ResponseResult getAllChiledren(@PathVariable("rootId") Long rootId){
        return replyService.getAllChiledren(rootId);
    }

}
