package com.mercury.api;

import java.util.List;

import com.mercury.api.controller.TasksController;
import com.mercury.api.model.task.Task;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

@SpringBootTest
class TaskControllerTests {

    @Autowired
    private TasksController tasksController;

    @Test
    public void getEmptyTasks() {
        tasksController.deleteTasks();
        List<Task> tasks = tasksController.getTasks().getBody();
        Assertions.assertTrue(tasks.isEmpty());
    }

    @Test
    public void addTasks() {
        String title = "test";
        Task task = tasksController.createTask(new Task(title, false)).getBody();
        Assertions.assertTrue(task.getTitle() == title);
    }

    @Test
    public void getTasks() {
        String title = "test";
        tasksController.createTask(new Task(title, false));
        List<Task> tasks = tasksController.getTasks().getBody();
        Assertions.assertFalse(tasks.isEmpty());
        Assertions.assertEquals(tasks.get(0).getTitle(), title);
    }

    @Test
    public void getTask() {
        String title = "test";
        Task task = tasksController.createTask(new Task(title, false)).getBody();
        HttpStatus statuscode = tasksController.getTask(task.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 200);
    }

    @Test
    public void deleteTask() {
        String title = "test";
        Task task = tasksController.createTask(new Task(title, false)).getBody();
        HttpStatus statuscode = tasksController.deleteTask(task.getId()).getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void deleteTasks() {
        String title = "test";
        tasksController.createTask(new Task(title, false));
        tasksController.createTask(new Task(title, false));
        HttpStatus statuscode = tasksController.deleteTasks().getStatusCode();
        Assertions.assertEquals(statuscode.value(), 204);
    }

    @Test
    public void replaceTask() {
        String title = "test";
        String id = tasksController.createTask(new Task("old", false)).getBody().getId();
        Task task = tasksController.replaceTask(id, new Task(title, false)).getBody();
        Assertions.assertEquals(task.getTitle(), title);
    }

}
