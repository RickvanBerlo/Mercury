package com.mercury.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.note.Note;
import com.mercury.api.service.note.NoteServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotesController {

    @Autowired
    private NoteServiceImpl service;

    @RequestMapping(value = "/notes", method = RequestMethod.POST)
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        try {
            Note _tutorial = service.save(new Note(note.getTitle(), note.getDescription()));
            return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public ResponseEntity<List<Note>> getNotes() {
        List<Note> notes = new ArrayList<>();
        try {
            notes = service.findAll();
            return new ResponseEntity<>(notes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/notes/{id}", method = RequestMethod.GET)
    public ResponseEntity<Note> getNote(@PathVariable("id") String id) {
        try {
            Optional<Note> note = service.findById(id);
            return new ResponseEntity<>(note.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/notes/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Note> replaceNote(@PathVariable("id") String id, @RequestBody Note note) {
        Optional<Note> retrived_note = service.findById(id);

        if (retrived_note.isPresent()) {
            Note _note = retrived_note.get();
            _note.setTitle(note.getTitle());
            _note.setDescription(note.getDescription());
            return new ResponseEntity<>(service.save(_note), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/notes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Note> deleteNote(@PathVariable("id") String id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/notes", method = RequestMethod.DELETE)
    public ResponseEntity<Note> deleteNotes() {
        try {
            service.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}