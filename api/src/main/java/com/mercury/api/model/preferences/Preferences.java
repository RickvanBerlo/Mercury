package com.mercury.api.model.preferences;

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
@Document(collection = "preferences")
@JsonInclude(Include.NON_NULL)
public class Preferences {
    @Id
    public String id;

    private boolean darkmode;
    private boolean clock;
    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Preferences() {
    }

    public Preferences(boolean darkmode, boolean clock) {
        this.darkmode = darkmode;
        this.clock = clock;
    }
}
