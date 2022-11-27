package com.kaoru.mapper;

import com.kaoru.pojo.Post;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @description 针对表【t_post(动态)】的数据库操作Mapper
* @Entity com.kaoru.pojo.Post
*/

@Mapper
public interface PostMapper extends BaseMapper<Post> {

}




