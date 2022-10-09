package com.kaoru.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.kaoru.pojo.Article;
import com.kaoru.utils.ResponseResult;

public interface ArticleService extends IService<Article> {

    /**
     * Paging query article list
     * @param page current page
     * @param pageSize page size
     * @param categoryId category id
     * @return ResponseResult JSON data
     */
    ResponseResult  articleList(Integer page, Integer pageSize, Long categoryId);


    /**
     * Get article details by id
     * @param id article id
     * @return ResponseResult JSON data
     */
    ResponseResult  getArticleDetail(Long id);
}
