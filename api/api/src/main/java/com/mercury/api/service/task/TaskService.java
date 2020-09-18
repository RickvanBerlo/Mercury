package com.mercury.api.service.task;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import com.mercury.api.model.task.Task;
import com.mercury.api.repository.TaskRepository;
import com.mercury.api.service.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService extends BaseService {
    @Autowired
    private TaskRepository taskRepository;

    public Task save(Task task) {
        task.setUserId(this.getUserId());
        return taskRepository.save(task);
    }

    public List<Task> findAll() {
        return taskRepository.findByUserId(this.getUserId());
    }

    public Optional<Task> findById(String id) {
        return taskRepository.findById(id);
    }

    public void deleteById(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getClosedTasksofToday() {
        return taskRepository.findByCreatedDateBetweenAndExecutedIsTrueAndUserId(Instant.now().truncatedTo(ChronoUnit.DAYS),Instant.now().plus(1, ChronoUnit.DAYS), 
                this.getUserId());
    }

    public List<Task> getOpenTasksofTodayAndEarlier() {
        return taskRepository.findByCreatedDateLessThanAndExecutedIsFalseAndUserId(Instant.now().plus(1, ChronoUnit.DAYS), 
                this.getUserId());
    }
}