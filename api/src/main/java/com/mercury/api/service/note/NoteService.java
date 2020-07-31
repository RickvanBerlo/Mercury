package com.mercury.api.service.note;

import java.util.List;
import java.util.Optional;

import com.mercury.api.model.note.Note;

public interface NoteService {

    public Note save(Note note);

    public List<Note> findAll();

    public Optional<Note> findById(String id);

    public void deleteById(String id);

    public void deleteAll();
}