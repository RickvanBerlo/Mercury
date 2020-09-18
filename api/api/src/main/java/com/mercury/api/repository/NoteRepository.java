package com.mercury.api.repository;

import java.util.List;

import com.mercury.api.model.note.Note;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoteRepository extends MongoRepository<Note, String> {
    public List<Note> findByUserId(String userId);
}