package com.mercury.api.model.weblink;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "weblinks")
@JsonInclude(Include.NON_NULL)
public class Weblink {

    @Id
    public String id;
    public String userId;

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

    public Weblink CreateResponseInstant() {
        Weblink tmp = new Weblink();
        tmp.setId(this.id);
        tmp.setTitle(this.title);
        tmp.setUrl(this.url);
        tmp.setColor(this.color);
        tmp.setLastModifiedDate(this.lastModifiedDate);
        tmp.setCreatedDate(this.createdDate);
        return tmp;
    }
}