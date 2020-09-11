package com.mercury.api.model.task;

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
@Document(collection = "tasks")
@JsonInclude(Include.NON_NULL)
public class Task {

    @Id
    public String id;
    public String userId;
    
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

    public Task CreateResponseInstant() {
        Task tmp = new Task();
        tmp.setId(this.id);
        tmp.setTitle(this.title);
        tmp.setExecuted(this.executed);
        tmp.setLastModifiedDate(this.lastModifiedDate);
        tmp.setCreatedDate(this.createdDate);
        return tmp;
    }
}