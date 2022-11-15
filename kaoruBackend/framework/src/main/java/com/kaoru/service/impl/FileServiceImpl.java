package com.kaoru.service.impl;

import com.azure.storage.common.ParallelTransferOptions;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.service.FileService;
import com.kaoru.utils.ResponseResult;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.azure.storage.file.share.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private ShareClient shareClient;

    @Value("${spring.cloud.azure.storage.fileshare.sas-token}")
    private String sasToken;

    @Override
    public String writeResource(String fileName, MultipartFile file) {

        String suffix = fileName.substring(fileName.lastIndexOf("."));

        // Using the file's MD5 hash as the file name
        try (InputStream inputStream = file.getInputStream()){
            String fileMD5 = DigestUtils.md5Hex(inputStream).toLowerCase();
            fileName = fileMD5 + suffix;
        } catch (IOException e) {
            throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(), e.getMessage());
        }

        ShareFileClient fileClient = shareClient.getRootDirectoryClient().getFileClient(fileName);


        // If the file does not exist, create it
        if (!fileClient.exists()){
            fileClient.create(file.getSize());
        }

        //
        ParallelTransferOptions transferOptions = new ParallelTransferOptions();

        // Upload the file
        try {
            fileClient.upload(file.getInputStream(), file.getSize(), transferOptions);
            return fileClient.getFileUrl() + sasToken;
        }
        catch (Exception e) {
            throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(), e.getMessage());
        }
    }
}
