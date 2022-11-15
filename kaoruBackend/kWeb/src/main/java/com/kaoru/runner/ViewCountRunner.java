package com.kaoru.runner;

import com.kaoru.mapper.ArticleMapper;
import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
import com.kaoru.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * When the application is started, this class will be executed.
 * Get the view count from database and save it to redis.
 */
@Component
public class ViewCountRunner implements CommandLineRunner {

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private RedisCache redisCache;

    @Override
    public void run(String... args)  {
        List<Article> articles = articleMapper.selectList(null);
        Map<String, Integer> viewMap = articles.stream().collect(Collectors.toMap(e -> String.valueOf(e.getId()), e -> Math.toIntExact(e.getViewCount())));
        redisCache.setCacheMap("article:viewCounts",viewMap);

    }
}
