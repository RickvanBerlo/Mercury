package com.mercury.api.model.fileStorage;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileInfo {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long lastModifiedDate;
    private long size;
}