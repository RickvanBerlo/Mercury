package com.mercury.api.model.fileStorage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileInfo {
    private String fileName;
    private String path;
    private String fileType;
    private long lastModifiedDate;
    private long size;

    public FileInfo() {
    }

    public FileInfo(String fileName, String path, String fileType, long lastModifiedDate, long size) {
        this.fileName = fileName;
        this.path = path;
        this.fileType = fileType;
        this.lastModifiedDate = lastModifiedDate;
        this.size = size;
    }
}