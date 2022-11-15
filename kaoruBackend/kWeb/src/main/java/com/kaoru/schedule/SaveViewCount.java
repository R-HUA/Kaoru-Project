package com.kaoru.schedule;

import com.kaoru.pojo.Article;
import com.kaoru.service.ArticleService;
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

    @Scheduled( cron = "0 0/20 * * * ?")
    public void saveViewCount(){
        Map<String, Integer> viewCountMap = redisCache.getCacheMap("article:viewCounts");

        List<Article> articles = viewCountMap.entrySet()
                .stream()
                .map(entry -> new Article(Long.valueOf(entry.getKey()), entry.getValue().longValue()))
                .collect(Collectors.toList());


        articleService.updateBatchById(articles);

        log.info("save view count to database successfully.");
    }
}
