package com.mercury.api.repository;

import java.time.Instant;
import java.util.List;

import com.mercury.api.model.task.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {

    public List<Task> findByCreatedDateBetweenAndExecutedIsTrueAndUserId(Instant start, Instant end, String userId);

    public List<Task> findByCreatedDateLessThanAndExecutedIsFalseAndUserId(Instant createdDate, String userId);

    public List<Task> findByUserId(String userId);
}