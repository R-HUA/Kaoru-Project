package com.kaoru.controller;

import com.kaoru.AppConstants;
import com.kaoru.annotation.AppLog;
import com.kaoru.pojo.Reply;
import com.kaoru.service.ReplyService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @AppLog
    @GetMapping("/replyList/{articleId}/{pageNum}/{pageSize}")
    public ResponseResult replyList(@PathVariable("articleId") Long articleId,
                                    @PathVariable("pageNum") Integer pageNum,
                                    @PathVariable(value = "pageSize", required = false) Integer pageSize){
        return replyService.replyList(AppConstants.REPLY_TYPE_ARTICLE, articleId, pageNum, pageSize);
    }

    @AppLog
    @PostMapping("/")
    public ResponseResult addReply(@RequestBody Reply reply){
        return replyService.addReply(reply);
    }

}
