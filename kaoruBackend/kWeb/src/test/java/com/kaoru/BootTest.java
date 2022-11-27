package com.kaoru;


import com.kaoru.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

@SpringBootTest
public class BootTest {

    @Autowired
    private FollowService followService;


    @Test
    public void test(){

        System.out.println(followService.getFollowingList(1234L));
    }
}
