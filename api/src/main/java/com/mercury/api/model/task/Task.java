package com.mercury.api.model.task;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "tasks")
public class Task {

    @Id
    public String id;

    private String title;
    private Boolean executed;
    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Task(){
        
    }

    public Task(String title, Boolean executed) {
        this.title = title;
        this.executed = executed;
    }
}