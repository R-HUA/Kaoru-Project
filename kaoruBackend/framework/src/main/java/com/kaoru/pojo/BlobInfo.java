package com.kaoru.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class BlobInfo {

    public String urlPrefix = "azure-blob://";

    public String containerName = "rhuablob";

    public String blobName = "test.txt";

    public String getUrl() {
        String url = urlPrefix + containerName + "/" + blobName;

        return url;
    }

    public void setUrl(String url) {
        return;
    }

}
