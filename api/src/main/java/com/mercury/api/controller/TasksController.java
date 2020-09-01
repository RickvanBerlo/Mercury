package com.mercury.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.task.Task;
import com.mercury.api.service.task.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TasksController {

    @Autowired
    private TaskService service;

    @RequestMapping(value = "/tasks", method = RequestMethod.POST)
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try {
            Task savedTask = service.save(new Task(task.getTitle(), task.getExecuted()));
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = new ArrayList<>();
        try {
            tasks = service.findAll();
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.GET)
    public ResponseEntity<Task> getTask(@PathVariable("id") String id) {
        try {
            Optional<Task> task = service.findById(id);
            return new ResponseEntity<>(task.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Task> replaceTask(@PathVariable("id") String id, @RequestBody Task task) {
        Optional<Task> retrived_task = service.findById(id);

        if (retrived_task.isPresent()) {
            Task _task = retrived_task.get();
            _task.setTitle(task.getTitle());
            _task.setExecuted(task.getExecuted());
            return new ResponseEntity<>(service.save(_task), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/tasks/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Task> deleteTask(@PathVariable("id") String id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.DELETE)
    public ResponseEntity<Task> deleteTasks() {
        try {
            service.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}