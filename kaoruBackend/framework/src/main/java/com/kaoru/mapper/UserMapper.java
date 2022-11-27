package com.kaoru.mapper;

import com.kaoru.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @description 针对表【t_user(用户表)】的数据库操作Mapper
* @Entity com.kaoru.pojo.User
*/

@Mapper
public interface UserMapper extends BaseMapper<User> {

}




