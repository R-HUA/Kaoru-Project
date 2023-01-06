package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.AppConstants;
import com.kaoru.mapper.ArticleMapper;
import com.kaoru.pojo.Article;
import com.kaoru.pojo.Post;
import com.kaoru.service.ArticleService;
import com.kaoru.service.FollowService;
import com.kaoru.service.ReplyService;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.RedisCache;
import com.kaoru.utils.ResponseResult;
import com.kaoru.utils.WebUtils;
import com.kaoru.vo.ArticleDetailsVo;
import com.kaoru.vo.ArticleListVo;
import com.kaoru.vo.PageVO;
import com.kaoru.vo.UserInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.kaoru.AppConstants.POST_STATUS_NORMAL;


@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private FollowService followService;

    @Autowired
    private ReplyService replyService;

    @Override
    public ResponseResult articleList(Long userId, Integer pageNum, Integer pageSize, Long categoryId) {

        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        // condition
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_NORMAL);
        if (categoryId != null){
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }
        queryWrapper.eq(Article::getCreateBy, userId);
        queryWrapper.orderByDesc(Article::getIsTop);


        // paging query
        Page<Article> articlePage = new Page<>(pageNum, pageSize);
        page(articlePage, queryWrapper);

        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articlePage.getRecords(), ArticleListVo.class);



        PageVO pageVO = new PageVO(articleListVos, articlePage.getTotal(),articlePage.getPages());



        return ResponseResult.okResult(pageVO);
    }

    /**
     * Get article details by id
     * @param id article id
     * @return ResponseResult JSON data
     */
    @Override
    public ResponseResult getArticleDetail(Long id) {
        Article article = getById(id);
        ArticleDetailsVo articleDetailVo = BeanCopyUtils.copyBean(article, ArticleDetailsVo.class);

        Long replyCount = replyService.getCountByArticleId(id);
        articleDetailVo.setCommentCount(replyCount);

        try {
            articleDetailVo.setViewCount(((Integer)redisCache.getCacheMapValue("article:viewCounts", String.valueOf(id))).longValue());
        } catch (Exception e) {
            log.error("Get article view count from redis failed: " + e.getMessage());
        }

        return ResponseResult.okResult(articleDetailVo);
    }

    @Override
    public Boolean updateArticleViewCount(Long id) {

        redisCache.incrementCacheMapValue("article:viewCounts", String.valueOf(id), 1);

        return true;
    }

    @Override
    public ResponseResult flowingArticleList(Integer pageNum, Integer pageSize) {

        Long currentUserId = WebUtils.getUserIDFromSecurityContext();

        List<UserInfoVo> followingUserList = followService.getFollowingUserList(currentUserId);

        Map<Long, UserInfoVo> followingUserMap = followingUserList.stream()
                .collect(Collectors.toMap(UserInfoVo::getId, userInfoVo -> userInfoVo));

        if (followingUserList.isEmpty()){
            return ResponseResult.okResult(new PageVO(followingUserList,0L));
        }

        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_NORMAL);
        queryWrapper.in(Article::getCreateBy, followingUserMap.keySet());
        queryWrapper.orderByDesc(Article::getIsTop);
        queryWrapper.orderByDesc(Article::getCreateTime);

        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        Page<Article> articlePage = new Page<>(pageNum, pageSize);
        page(articlePage, queryWrapper);

        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articlePage.getRecords(), ArticleListVo.class);

        articleListVos.forEach(articleListVo -> {
            articleListVo.setPoster(followingUserMap.get(articleListVo.getCreateBy()));
        });

        PageVO pageVO = new PageVO(articleListVos, articlePage.getTotal(), articlePage.getPages());

        return ResponseResult.okResult(pageVO);
    }
}
