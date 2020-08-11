package com.mercury.api.model.event;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "events")
public class Event {

    @Id
    public String id;

    private String title;
    private String description;
    private boolean allDay;
    private LocalDate startDate;
    private LocalDate endDate;
    private String color;
    private String startTime;
    private String endTime;

    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;

    public Event() {
    }

    public Event(String title, String description, boolean allDay, LocalDate startDate, LocalDate endDate, String color,
            String startTime, String endTime) {
        this.title = title;
        this.description = description;
        this.allDay = allDay;
        this.startDate = startDate;
        this.endDate = endDate;
        this.color = color;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}