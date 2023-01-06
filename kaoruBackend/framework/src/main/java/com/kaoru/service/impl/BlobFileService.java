package com.kaoru.service.impl;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.models.BlobItem;
import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import com.kaoru.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import static com.kaoru.AppConstants.BLOB_CONTAINER_NAME;
import static org.apache.xmlbeans.impl.util.XsTypeConverter.printHexBinary;


@Service
@Slf4j
public class BlobFileService implements FileService {

    @Autowired
    private BlobServiceClient blobServiceClient;

    @Autowired
    private FileService fileServiceImpl;

    private BlobContainerClient blobContainer;

    @PostConstruct
    private void init() {
        this.blobContainer = this.blobServiceClient.getBlobContainerClient(BLOB_CONTAINER_NAME);
    }


    /**
     * 上传文件到blob
     * @param fileName 文件名
     * @param file 文件
     * @return 返回文件的url
     */
    @Override
    public String writeResource(String fileName, MultipartFile file) {
        BlobClient blob = this.blobContainer.getBlobClient(fileName);

        if (isFull()) {
            log.error("Blob storage is full");
            if (fileServiceImpl.getClass().equals(this.getClass())) {
                throw new AppSystemException(CustomedHttpCodeEnum.SYSTEM_ERROR.getCode(),"Blob storage is full");
            }
            return fileServiceImpl.writeResource(fileName, file);
        }

        return blobUpload(blob, file);
    }

    public String blobUpload(BlobClient blob, MultipartFile file) {
        try {

            InputStream inputStream = file.getInputStream();

            if (!blob.exists()) {
                blob.upload(inputStream, file.getSize());

                BlobHttpHeaders headers = new BlobHttpHeaders()
                        .setContentType(file.getContentType())
                        .setContentMd5(blob.getProperties().getContentMd5());

                blob.setHttpHeaders(headers);

            } else {
                String blobMd5 = printHexBinary(blob.getProperties().getContentMd5()).toString().toLowerCase();
                String fileMD5 = DigestUtils.md5Hex(inputStream).toLowerCase();

                if (blobMd5.equals(fileMD5)) {
                    log.error("Blob already exists");
                    return blob.getBlobUrl();
                } else {
                    String fileName = UUID.randomUUID() + file.getOriginalFilename();
                    blob = this.blobContainer.getBlobClient(fileName);
                    blobUpload(blob, file);
                }
            }
        } catch (IOException e) {
            log.error("Error uploading file to blob storage", e);
            return null;
        }
        return blob.getBlobUrl();
    }


    public Boolean isFull() {
        BlobContainerClient blobContainerClient = this.blobServiceClient.getBlobContainerClient(BLOB_CONTAINER_NAME);
        Long totalSize = 0L;
        for (BlobItem blobItem : blobContainerClient.listBlobs()) {
            totalSize += blobItem.getProperties().getContentLength();
        }

        double totalSizeGB = totalSize / (double) (1024 * 1024 * 1024);

        log.info("Total size of all blobs: " + totalSizeGB + " GB");

        return totalSizeGB > 4.5;
    }
}
