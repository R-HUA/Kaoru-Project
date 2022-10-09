package com.kaoru.vo;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyVO {

    /**
     *  id       primaryKey
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
     * 根评论id
     */
    private Long rootId;

    /**
     * 所回复的目标评论的userid
     */
    private Long toCommentUserId;

    /**
     * 所回复的目标评论的user的用户名
     */
    private String toCommentUsername;

    /**
     * 回复目标评论id
     */
    private Long toCommentId;

    /**
     * 评论状态（0代表正常，1代表被举报，2代表被删除）
     */
    private String status;

    /**
     * user id who created this record
     */
    private Long createBy;

    /**
     *  username of createBy
     */
    private String username;

    /**
     *
     */
    private Date createTime;


    /**
     *  the list of replies to this reply
     */
    private List<ReplyVO> children;

}
