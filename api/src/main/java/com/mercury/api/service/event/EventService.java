package com.mercury.api.service.event;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.event.Event;
import com.mercury.api.repository.EventRepository;
import com.mercury.api.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService extends BaseService {

    @Autowired
    private EventRepository eventRepository;

    public Event save(Event event) {
        event.setUserId(this.getUserId());
        return eventRepository.save(event);
    }

    public Optional<Event> findById(String id) {
        return eventRepository.findById(id);
    }

    public void deleteById(String id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getAllEventsOfMonth(LocalDate month) {
        LocalDate start = month.withDayOfMonth(1);
        LocalDate end = month.withDayOfMonth(month.lengthOfMonth());
        //return eventRepository.findByStartDateBetweenOrEndDateBetween(start, end, start, end);
        return eventRepository.findByStartDateBetweenAndUserIdOrEndDateBetweenAndUserId(start, end,this.getUserId(), start,
                end, this.getUserId());
    }
}