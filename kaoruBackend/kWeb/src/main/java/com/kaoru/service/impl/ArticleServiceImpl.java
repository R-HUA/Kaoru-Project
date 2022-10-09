package com.kaoru.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kaoru.AppConstants;
import com.kaoru.mapper.ArticleMapper;
import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
import com.kaoru.utils.BeanCopyUtils;
import com.kaoru.utils.ResponseResult;
import com.kaoru.vo.ArticleDetailsVo;
import com.kaoru.vo.ArticleListVo;
import com.kaoru.vo.PageVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Override
    public ResponseResult articleList(Integer page, Integer pageSize, Long categoryId) {

        page = (page < 1) ? 1 : page;
        pageSize = Optional.ofNullable(pageSize).orElse(10);

        // condition
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Article::getStatus, AppConstants.ARTICLE_STATUS_NORMAL);
        if (categoryId != null){
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }
        queryWrapper.orderByDesc(Article::getIsTop);



        // paging query
        Page<Article> articlePage = new Page<>(page, pageSize);
        page(articlePage, queryWrapper);

        List<ArticleListVo> articleListVos = BeanCopyUtils.copyBeanList(articlePage.getRecords(), ArticleListVo.class);

        PageVO pageVO = new PageVO(articleListVos, articlePage.getTotal());



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
        return ResponseResult.okResult(articleDetailVo);
    }
}
