package com.example.springprojectcrud.controller;

import com.example.springprojectcrud.domain.Task;
import com.example.springprojectcrud.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> getTask(@PathVariable("id") Integer taskId) {
        if (taskId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Task task = taskService.getById(taskId);

        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> saveTask(@RequestBody Task newTask) {
        if (newTask == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Task createdTask = taskService.save(newTask);

        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> updateTask(@RequestBody Task newTask) {
        if (newTask == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Task createdTask = taskService.update(newTask);

        return new ResponseEntity<>(createdTask, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Task> deleteTask(@PathVariable("id") int taskId) {
        Task task = taskService.getById(taskId);

        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        taskService.delete(taskId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @RequestMapping(value = "/all", params = {"pageNumber", "pageSize"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Task>> getAllTask(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        List<Task> tasks = taskService.getAllTask(pageNumber, pageSize);

        if (tasks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tasks, HttpStatus.OK);

    }

    @RequestMapping(value = "/count", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> getAllTask() {
        long taskCount = taskService.getTaskCount();

        return new ResponseEntity<>(taskCount, HttpStatus.OK);

    }
}
