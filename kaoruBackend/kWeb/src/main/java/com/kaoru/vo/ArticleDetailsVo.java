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

    //访问量
    private Long viewCount;

    private Date createTime;
}
