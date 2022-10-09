package com.kaoru.service;

import com.kaoru.pojo.Reply;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.utils.ResponseResult;

/**
* @author H
* @description 针对表【t_reply(评论表)】的数据库操作Service
*/
public interface ReplyService extends IService<Reply> {

    ResponseResult replyList(String replyType, Long articleId, Integer pageNum, Integer pageSize);

    ResponseResult addReply(Reply reply);
}
