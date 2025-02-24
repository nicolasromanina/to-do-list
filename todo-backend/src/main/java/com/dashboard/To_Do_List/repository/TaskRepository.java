package com.dashboard.To_Do_List.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.dashboard.To_Do_List.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
}