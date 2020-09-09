package com.mercury.api.model.note;

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
@Document(collection = "notes")
@JsonInclude(Include.NON_NULL)
public class Note {

    @Id
    public String id;
    public String userId;

    private String title;
    private String description;
    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Note() {
    }

    public Note(String title, String description) {
        this.title = title;
        this.description = description;
    }
}