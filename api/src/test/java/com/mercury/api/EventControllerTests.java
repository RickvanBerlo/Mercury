package com.mercury.api;

import java.time.LocalDate;
import java.util.List;

import com.mercury.api.controller.EventsController;
import com.mercury.api.model.event.Event;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
public class EventControllerTests {

    @Autowired
    private EventsController eventsController;

    @Test
    public void addEvents() {
        String title = "test";
        Event events = eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"))
                .getBody();
        Assertions.assertTrue(events.getTitle() == title);
    }

    @Test
    public void getEventsOfMonth() {
        String title = "test";
        eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"));
        List<Event> events = eventsController.getEventOfMonth(LocalDate.now().toString()).getBody();
        Assertions.assertEquals(events.get(0).getTitle(), title);
    }

    @Test
    public void getEvent() {
        String title = "test";
        Event event = eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"))
                .getBody();
        HttpStatus statuscode = eventsController.getEvent(event.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 200);
    }

    @Test
    public void deleteEvent() {
        String title = "test";
        Event event = eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"))
                .getBody();
        HttpStatus statuscode = eventsController.deleteEvent(event.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void deleteEvents() {
        String title = "test";
        eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"));
        eventsController.createEvent(
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"));
        HttpStatus statuscode = eventsController.deleteEvents().getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void replaceEvent() {
        String title = "test";
        String id = eventsController.createEvent(
                new Event("old", "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"))
                .getBody().getId();
        Event event = eventsController.replaceEvent(id,
                new Event(title, "testing", false, LocalDate.now(), LocalDate.now(), "#ffffff", "00:00", "00:00"))
                .getBody();
        Assertions.assertEquals(event.getTitle(), title);
    }

}