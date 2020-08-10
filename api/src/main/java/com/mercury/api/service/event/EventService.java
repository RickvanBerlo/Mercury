package com.mercury.api.service.event;

import java.util.List;
import java.util.Optional;

import com.mercury.api.model.event.Event;
import com.mercury.api.repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Optional<Event> findById(String id) {
        return eventRepository.findById(id);
    }

    public void deleteById(String id) {
        eventRepository.deleteById(id);
    }

    public void deleteAll() {
        eventRepository.deleteAll();
    }
}