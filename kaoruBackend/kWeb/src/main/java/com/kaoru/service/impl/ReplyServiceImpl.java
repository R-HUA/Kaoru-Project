package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.AppConstants;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.Post;
import com.kaoru.pojo.Reply;
import com.kaoru.pojo.User;
import com.kaoru.service.PostService;
import com.kaoru.service.ReplyService;
import com.kaoru.mapper.ReplyMapper;
import com.kaoru.service.UserService;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.ResponseResult;
import com.kaoru.utils.WebUtils;
import com.kaoru.vo.PageVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import java.util.List;
import com.kaoru.vo.ReplyVO;
import org.springframework.util.StringUtils;

/**
*
*  针对表【t_reply(评论表)】的数据库操作Service实现
*/
@Service
public class ReplyServiceImpl extends ServiceImpl<ReplyMapper, Reply> implements ReplyService{

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Override
    public ResponseResult replyList(String replyType, Long articleId, Integer pageNum, Integer pageSize) {

        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = (pageSize == null) ? 10 : pageSize;

        LambdaQueryWrapper<Reply> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Reply::getRepliedId, articleId);
        queryWrapper.eq(Reply::getType, replyType);
        queryWrapper.eq(Reply::getRootId, AppConstants.REPLY_ROOT_ID_IS_ROOT);
        queryWrapper.eq(Reply::getStatus, AppConstants.REPLY_STATUS_NORMAL);
        queryWrapper.orderByDesc(Reply::getCreateTime);

        Page<Reply> page = new Page<>(pageNum, pageSize);
        page(page, queryWrapper);
        List<Reply> replies = page.getRecords();

        List<ReplyVO> replyVOList = toReplyVOList(replies);

        for (ReplyVO replyVo : replyVOList) {
            // 查询次级评论
            List<ReplyVO> children = getChildren(replyVo.getId());
            replyVo.setChildren(children);
        }


        return ResponseResult.okResult(new PageVO(replyVOList , page.getTotal(), page.getPages()));
    }

    /**
     * 添加评论
     *
     */
    @Override
    public ResponseResult addReply(Reply reply) {


        if (StringUtils.hasText(reply.getContent())
                && reply.getRepliedId() != null
                && StringUtils.hasText(reply.getType())) {

            boolean isSave = save(reply);

            if (isSave){

                ReplyVO newReplyVO = BeanCopyUtils.copyBean(getById(reply.getId()), ReplyVO.class);

                // 更新评论数
                if (reply.getType().equals(AppConstants.REPLY_TYPE_POST)) {
                    LambdaUpdateWrapper<Post> updateWrapper = new LambdaUpdateWrapper<>();
                    updateWrapper.eq(Post::getId, reply.getRepliedId());
                    updateWrapper.setSql("comment_count = comment_count + 1");
                    postService.update(updateWrapper);
                }

                return ResponseResult.okResult(newReplyVO);
            }

            throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);

        }

        throw new AppSystemException(CustomedHttpCodeEnum.PARAMETER_ERROR);

    }

    private List<ReplyVO> toReplyVOList(List<Reply> list){
        List<ReplyVO> ReplyVOs = BeanCopyUtils.copyBeanList(list, ReplyVO.class);
        //遍历vo集合
        for (ReplyVO ReplyVO : ReplyVOs) {

            //通过creatyBy查询用户的信息并赋值
            User user = userService.getById(ReplyVO.getCreateBy());

            ReplyVO.setUsername(user.getNickName());
            ReplyVO.setUserAvatar(user.getAvatar());

            //通过toCommentUserId查询用户的昵称并赋值
            //如果toCommentUserId不为-1才进行查询
            if(ReplyVO.getToCommentUserId()!=-1){

                User toCommentUser = userService.getById(ReplyVO.getToCommentUserId());
                if (toCommentUser != null){
                    ReplyVO.setToCommentUsername(user.getNickName());
                }
                else {
                    log.error("Error in query user id:" + ReplyVO.getToCommentUserId());
                }


            }
        }
        return ReplyVOs;
    }

    /**
     * 根据根评论的id查询所对应的子评论的集合
     */
    private List<ReplyVO> getChildren(Long id, Integer pageNum, Integer pageSize) {

        if (pageNum == null || pageNum < 1) {
            pageNum = 1;
        }

        if (pageSize == null || pageSize < 3) {
            pageSize = 3;
        }

        LambdaQueryWrapper<Reply> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Reply::getRootId,id);
        queryWrapper.eq(Reply::getStatus, AppConstants.REPLY_STATUS_NORMAL);
        queryWrapper.orderByDesc(Reply::getCreateTime);

        Page<Reply> page = new Page<>(pageNum, pageSize);
        page(page, queryWrapper);

        List<Reply> replies = page.getRecords();

        List<ReplyVO> replyVOList = toReplyVOList(replies);

        if (replyVOList.size() < page.getTotal()){
            replyVOList.add(null);
        }

        return replyVOList;
    }

    private List<ReplyVO> getChildren(Long id){
        return getChildren(id, null, null);
    }


    public ResponseResult getAllChiledren(Long id){
        LambdaQueryWrapper<Reply> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Reply::getRootId,id);
        queryWrapper.orderByDesc(Reply::getCreateTime);
        queryWrapper.eq(Reply::getStatus, AppConstants.REPLY_STATUS_NORMAL);
        List<Reply> replies = this.list(queryWrapper);
        return ResponseResult.okResult(toReplyVOList(replies));
    }

    @Override
    public Long getCountByArticleId(Long id) {
        return getCountByID(id, AppConstants.REPLY_TYPE_ARTICLE);
    }

    @Override
    public Long getCountByPostId(Long id) {
        return getCountByID(id, AppConstants.REPLY_TYPE_POST);
    }


    private Long getCountByID(Long rID, String replyType){
        LambdaQueryWrapper<Reply> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Reply::getRepliedId, rID);
        queryWrapper.eq(Reply::getType, replyType);
        return this.count(queryWrapper);
    }

}




