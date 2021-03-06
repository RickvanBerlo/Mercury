package com.mercury.api.controller;

import java.util.stream.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.event.Event;
import com.mercury.api.service.event.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventsController {

    @Autowired
    private EventService service;

    @RequestMapping(value = "/events", method = RequestMethod.POST)
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        try {
            Event savedEvent = service.save(new Event(
                event.getTitle(), 
                event.getDescription(), 
                event.isHasTime(), 
                event.getStartDate(), 
                event.getEndDate(),
                event.getColor(), 
                event.getStartTime(), 
                event.getEndTime()
            ));
            return new ResponseEntity<>(savedEvent.CreateResponseInstant(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public ResponseEntity<List<Event>> getEventOfMonth(@RequestParam String month) {
        try {
            LocalDate date = LocalDate.parse(month);
            List<Event> events = service.getAllEventsOfMonth(date).stream().map(object -> object.CreateResponseInstant()).collect(Collectors.toList());
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.GET)
    public ResponseEntity<Event> getEvent(@PathVariable("id") String id) {
        try {
            Optional<Event> event = service.findById(id);
            return new ResponseEntity<>(event.get().CreateResponseInstant(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Event> replaceEvent(@PathVariable("id") String id, @RequestBody Event event) {
        Optional<Event> retrived_event = service.findById(id);

        if (retrived_event.isPresent()) {
            Event _event = retrived_event.get();
            _event.setTitle(event.getTitle());
            _event.setColor(event.getColor());
            _event.setEndTime(event.getEndTime());
            _event.setStartTime(event.getStartTime());
            _event.setStartDate(event.getStartDate());
            _event.setEndDate(event.getEndDate());
            _event.setHasTime(event.isHasTime());
            _event.setDescription(event.getDescription());
            return new ResponseEntity<>(service.save(_event).CreateResponseInstant(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Event> deleteEvent(@PathVariable("id") String id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}