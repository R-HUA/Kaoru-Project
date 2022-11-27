package com.kaoru.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageVO {
    // 当页数据
    private List rows;

    // 总条数
    private Long total;
}
