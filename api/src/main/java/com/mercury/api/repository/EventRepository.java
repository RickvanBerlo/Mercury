package com.mercury.api.repository;

import com.mercury.api.model.event.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepository extends MongoRepository<Event, String> {

}