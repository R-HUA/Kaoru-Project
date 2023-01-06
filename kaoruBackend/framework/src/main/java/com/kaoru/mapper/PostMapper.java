package com.kaoru.mapper;

import com.kaoru.pojo.Post;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;

/**
* @description 针对表【t_post(动态)】的数据库操作Mapper
* @Entity com.kaoru.pojo.Post
*/

@Mapper
public interface PostMapper extends BaseMapper<Post> {

/*    @Select("SELECT e1.*, e2.* FROM t_post e1 LEFT JOIN t_post e2 ON e1.repost_id = e2.id WHERE e1.id = #{id} and e1.status = 0 and e1.del_flag = 0")
    @ResultMap("BaseResultMap")
    Post selectPostById(Long id);*/


}




