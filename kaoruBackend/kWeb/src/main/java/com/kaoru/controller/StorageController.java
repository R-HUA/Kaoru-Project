package com.kaoru.controller;

import com.kaoru.annotation.AppLog;
import com.kaoru.annotation.PreventDuplicate;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.service.FileService;
import com.kaoru.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("file")
public class StorageController {

    @Autowired
    private FileService blobFileService;

    @AppLog
    @PreventDuplicate
    @PostMapping("/{fileName}")
    public ResponseResult uploadFile(@PathVariable("fileName") String fileName, MultipartFile file){

        String url =  blobFileService.writeResource(fileName, file);

        if (url!=null){
            return ResponseResult.okResult(url);
        }
        else {
            return ResponseResult.errorResult(CustomedHttpCodeEnum.SYSTEM_ERROR);
        }
    }


}
