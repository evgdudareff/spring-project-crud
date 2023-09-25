package com.example.springprojectcrud.service;

import com.example.springprojectcrud.domain.Task;
import com.example.springprojectcrud.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task getById(int id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Task update(Task task) {
        return taskRepository.save(task);
    }

    public void delete(int id) {
        taskRepository.deleteById(id);
    }


    public List<Task> getAllTask(int pageNumber, int pageSize) {
        Pageable pageableObj = PageRequest.of(pageNumber, pageSize);
        Page<Task> tasksPage = taskRepository.findAll(pageableObj);

        return tasksPage.getContent();
    }

    public long getTaskCount(){
        return taskRepository.count();
    }

}
