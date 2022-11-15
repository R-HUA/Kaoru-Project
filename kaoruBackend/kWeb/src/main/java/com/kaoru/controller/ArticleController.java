package com.kaoru.controller;

import com.azure.core.annotation.Put;
import com.kaoru.annotation.AppLog;
import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
import com.kaoru.utils.ResponseResult;
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
    @GetMapping("/articleList/{page}")
    public ResponseResult articleList(@PathVariable(name = "page") Integer page, Integer pageSize, Long categoryId) {
         return articleService.articleList(page, pageSize, categoryId);
    }

    @AppLog
    @GetMapping("/{id}")
    public ResponseResult getArticleDetail(@PathVariable("id") Long id){
        return articleService.getArticleDetail(id);
    }

    @PutMapping("/{id}/viewCount")
    @AppLog
    public ResponseResult updateArticleViewCount(@PathVariable("id") Long id){
        return articleService.updateArticleViewCount(id);
    }


}
