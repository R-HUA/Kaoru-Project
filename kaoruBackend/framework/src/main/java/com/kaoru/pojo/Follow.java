package com.kaoru.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 关注表
 * @TableName t_follow
 */
@TableName(value ="t_follow")
@Data
public class Follow implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 粉丝(关注者)
     */
    private Long followerId;

    /**
     * 被关注者
     */
    private Long followeeId;

    /**
     * 状态（0普通，1特别关注）
     */
    private String status;

    /**
     * 
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createBy;


    @TableField(fill = FieldFill.INSERT)
    private Date createTime;


    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;


    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /**
     * 删除标志（0代表未删除，1代表已删除）
     */
    private Integer delFlag;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}