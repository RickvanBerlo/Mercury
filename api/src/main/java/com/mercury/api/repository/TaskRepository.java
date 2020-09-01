package com.mercury.api.repository;

import com.mercury.api.model.task.Task;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {

}