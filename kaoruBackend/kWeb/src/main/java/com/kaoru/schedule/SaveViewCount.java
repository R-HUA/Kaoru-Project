package com.kaoru.schedule;

import com.kaoru.pojo.Article;
import com.kaoru.pojo.Post;
import com.kaoru.service.ArticleService;
import com.kaoru.service.PostService;
import com.kaoru.utils.RedisCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class SaveViewCount {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private PostService postService;

    @Scheduled( cron = "0 0/30 * * * ?")
    public void saveViewCount(){
        Map<String, Integer> aViewCountMap = redisCache.getCacheMap("article:viewCounts");

        List<Article> articles = aViewCountMap.entrySet()
                .stream()
                .map(entry -> new Article(Long.valueOf(entry.getKey()), entry.getValue().longValue()))
                .collect(Collectors.toList());


        articleService.updateBatchById(articles);


        Map<String, Integer> pviewCountMap = redisCache.getCacheMap("post:viewCounts");

        List<Post> posts = pviewCountMap.entrySet()
                .stream()
                .map(entry -> new Post(Long.valueOf(entry.getKey()), entry.getValue().longValue()))
                .collect(Collectors.toList());

        postService.updateBatchById(posts);



        log.info("Save view count to database successfully. 保存浏览量到数据库");
    }
}
