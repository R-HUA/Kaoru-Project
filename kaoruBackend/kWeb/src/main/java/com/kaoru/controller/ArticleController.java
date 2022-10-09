package com.kaoru.controller;

import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
import com.kaoru.utils.ResponseResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/articleList/{page}")
    public ResponseResult articleList(@PathVariable(name = "page") Integer page, Integer pageSize, Long categoryId) {
         return articleService.articleList(page, pageSize, categoryId);
    }

    @GetMapping("/{id}")
    public ResponseResult getArticleDetail(@PathVariable("id") Long id){
        return articleService.getArticleDetail(id);
    }

}
