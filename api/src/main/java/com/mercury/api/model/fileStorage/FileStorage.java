package com.mercury.api.model.fileStorage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class FileStorage {
    @Value("${fileStorage.location}")

    private String location;
}