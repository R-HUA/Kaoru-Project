package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.AppConstants;
import com.kaoru.dto.ArticleDto;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.mapper.ArticleMapper;
import com.kaoru.pojo.Article;
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

        // condition
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_NORMAL);
        if (categoryId != null){
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }
        queryWrapper.eq(Article::getCreateBy, userId);
        queryWrapper.orderByDesc(Article::getIsTop);
        queryWrapper.orderByDesc(Article::getCreateTime);


        return getPageResult(pageNum, pageSize, queryWrapper);
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

        queryWrapper.orderByDesc(Article::getCreateTime);

        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        Page<Article> articlePage = new Page<>(pageNum, pageSize);
        page(articlePage, queryWrapper);

        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articlePage.getRecords(), ArticleListVo.class);

        articleListVos.forEach(articleListVo -> {
            articleListVo.setPoster(followingUserMap.get(articleListVo.getCreateBy()));
            try {
                articleListVo.setViewCount(((Integer)redisCache.getCacheMapValue("article:viewCounts", String.valueOf(articleListVo.getId()))).longValue());
            } catch (Exception e) {
                log.error("Get article view count from redis failed: " + e.getMessage());
            }
        });

        PageVO pageVO = new PageVO(articleListVos, articlePage.getTotal(), articlePage.getPages());

        return ResponseResult.okResult(pageVO);
    }

    @Override
    public ResponseResult getRecentArticleList(Integer pageSize) {
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_NORMAL);
        queryWrapper.orderByDesc(Article::getCreateTime);
        queryWrapper.last( pageSize == null ? "limit 3" : "limit " + pageSize);

        List<Article> articleList = list(queryWrapper);
        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articleList, ArticleListVo.class);

        return ResponseResult.okResult(articleListVos);

    }

    @Override
    public ResponseResult addArticle(ArticleDto articleDto) {
        Article article = BeanCopyUtils.copyBean(articleDto, Article.class);

        if(save(article)){
            return ResponseResult.okResult(article.getId());
        }

        throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);
    }

    @Override
    public ResponseResult draftList(Integer pageNum, Integer pageSize) {

        Long userId = WebUtils.getUserIDFromSecurityContext();

        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_DRAFT);
        queryWrapper.eq(Article::getCreateBy, userId);

        return getPageResult(pageNum, pageSize, queryWrapper);
    }

    @Override
    public ResponseResult getDraft(Long id) {

        ArticleDto articleDto = BeanCopyUtils.copyBean(getById(id), ArticleDto.class);

        return ResponseResult.okResult(articleDto);
    }

    @Override
    public ResponseResult updateArticle(ArticleDto articleDto) {
        Article article = BeanCopyUtils.copyBean(articleDto, Article.class);

        if(updateById(article)){
            return ResponseResult.okResult(article.getId());
        }

        throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);
    }

    private ResponseResult getPageResult(Integer pageNum, Integer pageSize, LambdaQueryWrapper<Article> queryWrapper) {

        pageNum = (pageNum < 1) ? 1 : pageNum;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        Page<Article> articlePage = new Page<>(pageNum, pageSize);
        page(articlePage, queryWrapper);

        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articlePage.getRecords(), ArticleListVo.class);


        try {
            articleListVos.forEach(articleListVo -> {

                Long viewCount = ((Integer)redisCache.getCacheMapValue("article:viewCounts", String.valueOf(articleListVo.getId()))).longValue();
                articleListVo.setViewCount(viewCount);
            });
        }
        catch (Exception e) {
            log.error("Get article view count from redis failed: " + e.getMessage());
        }

        PageVO pageVO = new PageVO(articleListVos, articlePage.getTotal(),articlePage.getPages());

        return ResponseResult.okResult(pageVO);
    }
}
