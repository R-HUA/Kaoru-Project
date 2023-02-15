package com.kaoru.runner;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.kaoru.mapper.ArticleMapper;
import com.kaoru.pojo.Article;
import com.kaoru.pojo.Post;
import com.kaoru.service.ArticleService;
import com.kaoru.service.PostService;
import com.kaoru.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.kaoru.AppConstants.ARTICLE_STATUS_NORMAL;
import static com.kaoru.AppConstants.POST_STATUS_NORMAL;


/**
 * When the application is started, this class will be executed.
 * Get the view count from database and save it to redis.
 */
@Component
public class ViewCountRunner implements CommandLineRunner {

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private PostService postService;

    @Autowired
    private RedisCache redisCache;

    @Override
    public void run(String... args)  {
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getStatus, ARTICLE_STATUS_NORMAL);
        List<Article> articles = articleMapper.selectList(queryWrapper);


        Map<String, Integer> viewMap = articles.stream().collect(
                Collectors.toMap(
                        e -> String.valueOf(e.getId()),
                        e -> Math.toIntExact(e.getViewCount())
                )
        );

        redisCache.setCacheMap("article:viewCounts",viewMap);


        LambdaQueryWrapper<Post> postWrapper = new LambdaQueryWrapper<>();
        postWrapper.eq(Post::getStatus, POST_STATUS_NORMAL);
        List<Post> posts = postService.list(postWrapper);

        redisCache.setCacheMap("post:viewCounts", posts.stream().collect(
                Collectors.toMap(
                        e -> String.valueOf(e.getId()),
                        e -> Math.toIntExact(e.getViewCount())
                )
        ));

    }
}
