package com.mercury.api.model.event;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

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
@Document(collection = "events")
@JsonInclude(Include.NON_NULL)
public class Event {

    @Id
    public String id;
    public String userId;

    private String title;
    private String description;
    private boolean hasTime;
    private LocalDate startDate;
    private LocalDate endDate;
    private String color;
    private LocalTime startTime;
    private LocalTime endTime;

    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant lastModifiedDate;

    public Event() {
    }

    public Event(String title, String description, boolean hasTime, LocalDate startDate, LocalDate endDate,
            String color, LocalTime startTime, LocalTime endTime) {
        this.title = title;
        this.description = description;
        this.hasTime = hasTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.color = color;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}