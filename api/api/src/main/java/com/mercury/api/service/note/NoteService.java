package com.mercury.api.service.note;

import java.util.List;
import java.util.Optional;

import com.mercury.api.model.note.Note;
import com.mercury.api.repository.NoteRepository;
import com.mercury.api.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService extends BaseService{

    @Autowired
    private NoteRepository noteRepository;

    public Note save(Note note) {
        note.setUserId(this.getUserId());
        return noteRepository.save(note);
    }

    public List<Note> findAll() {
        return noteRepository.findByUserId(this.getUserId());
    }

    public Optional<Note> findById(String id) {
        return noteRepository.findById(id);
    }

    public void deleteById(String id) {
        noteRepository.deleteById(id);
    }
}