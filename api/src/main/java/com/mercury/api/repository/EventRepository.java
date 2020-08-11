package com.mercury.api.repository;

import java.time.LocalDate;
import java.util.List;

import com.mercury.api.model.event.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

    public List<Event> findByStartDateBetweenOrEndDateBetween(LocalDate start, LocalDate end, LocalDate start1,
            LocalDate end2);
}