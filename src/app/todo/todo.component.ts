import { Component, OnInit } from '@angular/core';
import { TodoService, TaskDto } from '../todo.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  sub$ = new Subject();

  tasks: TaskDto[] = [];

  controlNewTaskName = new FormControl();
  controlTaskNames = new FormArray([]);

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService
      .getTasks()
      .pipe(takeUntil(this.sub$))
      .subscribe(tasks => {
        this.tasks = tasks;

        this.controlTaskNames = new FormArray((tasks || []).map(task => new FormControl(task.name)));
      });
  }

  addTask() {
    this.todoService.addTask(this.controlNewTaskName.value);
    this.controlNewTaskName.setValue(null);
  }

  updateTask(index: number) {
    const id: number = this.tasks.find((it, idx) => idx === index).id;
    const name: string = this.controlTaskNames.at(index).value;

    const nextTask: TaskDto = {id, name};

    this.todoService.updateTask(id, nextTask);
  }

  removeTask(id: number) {
    this.todoService.removeTask(id);
  }

}
