package com.kaoru.mapper;

import com.kaoru.pojo.Reply;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author H
* @description 针对表【t_reply(评论表)】的数据库操作Mapper
* @createDate 2023-06-17 17:57:46
* @Entity com.kaoru.pojo.Reply
*/

@Mapper
public interface ReplyMapper extends BaseMapper<Reply> {

}




