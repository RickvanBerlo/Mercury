package com.mercury.api.model.fileStorage;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Directory {
    private String path;
    private List<FileInfo> files;
}