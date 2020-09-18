package com.mercury.api;

import java.util.List;

import com.mercury.api.controller.NotesController;
import com.mercury.api.model.note.Note;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
class NoteControllerTests {

	@Autowired
	private NotesController noteController;

	@Test
	public void getEmptyNotes() {
		List<Note> notes = noteController.getNotes().getBody();
		Assertions.assertTrue(notes.isEmpty());
	}

	@Test
	public void addNotes() {
		String title = "test";
		Note notes = noteController.createNote(new Note(title, "testing")).getBody();
		Assertions.assertTrue(notes.getTitle() == title);
	}

	@Test
	public void getNotes() {
		String title = "test";
		noteController.createNote(new Note(title, "testing"));
		List<Note> notes = noteController.getNotes().getBody();
		Assertions.assertFalse(notes.isEmpty());
		Assertions.assertEquals(notes.get(0).getTitle(), title);
	}

	@Test
	public void getNote() {
		String title = "test";
		Note note = noteController.createNote(new Note(title, "testing")).getBody();
		HttpStatus statuscode = noteController.getNote(note.getId()).getStatusCode();
		Assertions.assertEquals(statuscode.value(), 200);
	}

	@Test
	public void deleteNote() {
		String title = "test";
		Note note = noteController.createNote(new Note(title, "testing")).getBody();
		HttpStatus statuscode = noteController.deleteNote(note.getId()).getStatusCode();
		Assertions.assertEquals(statuscode.value(), 204);
	}

	@Test
	public void replaceNote() {
		String title = "test";
		String id = noteController.createNote(new Note("old", "testing")).getBody().getId();
		Note note = noteController.replaceNote(id, new Note(title, "testing")).getBody();
		Assertions.assertEquals(note.getTitle(), title);
	}

}
