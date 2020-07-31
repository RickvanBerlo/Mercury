package com.mercury.api.model.note;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "notes")
public class Note {

    @Id
    public String id;

    private String title;
    private String description;
    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;

    public Note() {
    }

    public Note(String title, String description) {
        this.title = title;
        this.description = description;
    }
}