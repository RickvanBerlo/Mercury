package com.mercury.api.repository;

import java.util.Date;
import java.util.List;

import com.mercury.api.model.event.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

    public List<Event> findByStartDateAndEndDateBetween(Date start, Date end);
}