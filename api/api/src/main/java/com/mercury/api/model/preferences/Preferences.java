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
    private String userId;

    private boolean darkmode;
    private boolean clock;
    private Image backgroundImage;
    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Preferences() {
        this.darkmode = false;
        this.clock = false;
        this.backgroundImage = new Image();
    }

    public Preferences(boolean darkmode, boolean clock, Image backgroundImage) {
        this.darkmode = darkmode;
        this.clock = clock;
        this.backgroundImage = backgroundImage;
    }

    public Preferences CreateResponseInstant() {
        Preferences tmp = new Preferences();
        tmp.setClock(this.clock);
        tmp.setDarkmode(this.darkmode);
        tmp.setCreatedDate(this.createdDate);
        tmp.setBackgroundImage(this.backgroundImage);
        tmp.setLastModifiedDate(this.lastModifiedDate);
        return tmp;
    }
}
