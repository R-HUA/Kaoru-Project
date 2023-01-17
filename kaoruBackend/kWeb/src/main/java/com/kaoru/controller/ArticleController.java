package com.kaoru.controller;

import com.azure.core.annotation.Put;
import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.dto.ArticleDto;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
import com.kaoru.utils.ResponseResult;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * ArticleController
 * &#064;auther  H
 */
@RestController
@RequestMapping("/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @AppLog
    @PreventDuplicate
    @GetMapping("/articleList/{page}")
    public ResponseResult flowingArticleList(@PathVariable(name = "page") Integer page, Integer pageSize) {
         return articleService.flowingArticleList(page, pageSize);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/articleList/{userId}/{page}")
    public ResponseResult userArticleList(@PathVariable("userId") Long userId, @PathVariable(name = "page") Integer page, Integer pageSize, Long categoryId) {

        return articleService.articleList(userId, page, pageSize, categoryId);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/articleList/draft/{page}")
    public ResponseResult userDraftList(@PathVariable(name = "page") Integer page, Integer pageSize) {
        return articleService.draftList(page, pageSize);
    }


    @AppLog
    @PreventDuplicate
    @GetMapping("/{id}")
    public ResponseResult getArticleDetail(@PathVariable("id") Long id){

        ResponseResult articleDetail = articleService.getArticleDetail(id);

        if (articleDetail.getCode() == 200){
            articleService.updateArticleViewCount(id);
            return articleDetail;
        }

        return articleDetail;
    }

/*    @PutMapping("/{id}/viewCount")
    @AppLog
    public ResponseResult updateArticleViewCount(@PathVariable("id") Long id){

        if (articleService.updateArticleViewCount(id)){
            return ResponseResult.okResult();
        }

        throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR);
    }*/

    @AppLog
    @PreventDuplicate
    @GetMapping("/articleList")
    public ResponseResult getRecentArticleList(@Nullable Integer pageSize) {
        return articleService.getRecentArticleList(pageSize);
    }

    @AppLog
    @PreventDuplicate
    @PostMapping("")
    public ResponseResult addArticle(@RequestBody ArticleDto articleDto) {
        return articleService.addArticle(articleDto);
    }

    @AppLog
    @PreventDuplicate
    @GetMapping("/draft/{id}")
    public ResponseResult getDraft(@PathVariable("id") Long id) {
        return articleService.getDraft(id);
    }

    @AppLog
    @PreventDuplicate
    @PutMapping("")
    public ResponseResult updateArticle(@RequestBody ArticleDto articleDto) {
        return articleService.updateArticle(articleDto);
    }

}
