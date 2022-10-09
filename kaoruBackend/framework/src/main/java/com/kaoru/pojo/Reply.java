package com.kaoru.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 评论表
 * @TableName t_reply
 */
@TableName(value ="t_reply")
@Data
public class Reply implements Serializable {

    /**
     *  ID      primaryKey
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 点赞数
     */
    private Long numLikes;

    /**
     * 被评论的内容的类型（0代表文章评论，1代表动态）
     */
    private String type;

    /**
     * 被回复的内容的id
     */
    private Long repliedId;

    /**
     * 根评论id
     */
    private Long rootId;

    /**
     * 所回复的目标评论的userid
     */
    private Long toCommentUserId;

    /**
     * 回复目标评论id
     */
    private Long toCommentId;

    /**
     * 评论状态（0代表正常，1代表被举报，2代表被删除）
     */
    private String status;

    /**
     * 
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createBy;

    /**
     * 
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;

    /**
     * 
     */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /**
     * 删除标志（0代表未删除，1代表已删除）
     */
    private Integer delFlag;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}