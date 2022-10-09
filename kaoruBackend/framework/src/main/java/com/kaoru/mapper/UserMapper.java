package com.kaoru.mapper;

import com.kaoru.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author H
* @description 针对表【t_user(用户表)】的数据库操作Mapper
* @createDate 2023-06-16 16:13:26
* @Entity com.kaoru.pojo.User
*/

@Mapper
public interface UserMapper extends BaseMapper<User> {

}




