package com.kaoru.mapper;

import com.kaoru.pojo.Follow;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @description 针对表【t_follow(关注表)】的数据库操作Mapper
* @Entity com.kaoru.pojo.Follow
*/

@Mapper
public interface FollowMapper extends BaseMapper<Follow> {

}




