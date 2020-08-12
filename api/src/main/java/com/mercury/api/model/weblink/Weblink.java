package com.mercury.api.model.weblink;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "weblinks")
public class Weblink {

    @Id
    public String id;

    private String title;
    private String url;
    private String color;
    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Weblink() {
    }

    public Weblink(String title, String url, String color) {
        this.title = title;
        this.url = url;
        this.color = color;
    }
}