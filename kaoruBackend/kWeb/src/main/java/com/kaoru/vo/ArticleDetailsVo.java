package com.kaoru.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDetailsVo {

    private Long id;
    //标题
    private String title;

    //文章内容
    private String content;

    //所属分类id
    private Long categoryId;

    private String thumbnail;

    //访问量
    private Long viewCount;

    private Long commentCount;

    private Long createBy;

    private UserInfoVo poster;

    private Date createTime;

}
