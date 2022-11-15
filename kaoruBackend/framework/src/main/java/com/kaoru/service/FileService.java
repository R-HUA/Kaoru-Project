package com.kaoru.service;

import com.kaoru.utils.ResponseResult;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;

public interface FileService {
    String writeResource(String fileName, MultipartFile file);
}
