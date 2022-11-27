package com.kaoru.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostVo {

    private Long id;
    private Long createBy;
    private String content;

    private String image1;
    private String image2;
    private String image3;
    private String video;
    private String isTop;
    private Long viewCount;
    private String isComment;
    private Long commentCount;
    private Long likeCount;
    private Long repostId;
    private Date createTime;
    private Date updateTime;


}
