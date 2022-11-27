package com.kaoru.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 动态
 * &#064;TableName  t_post
 */
@TableName(value ="t_post")
@Data
public class Post implements Serializable {
    /**
     * ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 动态内容
     */
    private String content;

    /**
     * 图1
     */
    private String image1;

    /**
     * 图2
     */
    private String image2;

    /**
     * 图3
     */
    private String image3;

    /**
     * 视频
     */
    private String video;

    /**
     * 是否置顶（0否，1是）
     */
    private String isTop;

    /**
     * 状态（0已发布，1未发布）
     */
    private String status;

    /**
     * 访问量
     */
    private Long viewCount;

    /**
     * 是否允许评论 1是，0否
     */
    private String isComment;

    /**
     * 评论量
     */
    private Long commentCount;

    /**
     * 点赞量
     */
    private Long likeCount;

    /**
     * 转发引用的动态id
     */
    private Long repostId;

    /**
     * 
     */
    private Long createBy;

    /**
     * 
     */
    private Date createTime;

    /**
     * 
     */
    private Long updateBy;

    /**
     * 
     */
    private Date updateTime;

    /**
     * 删除标志（0代表未删除，1代表已删除）
     */
    private Integer delFlag;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}