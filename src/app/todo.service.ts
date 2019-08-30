import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class TaskDto {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  nextId = 0;
  tasks$ = new BehaviorSubject<TaskDto[]>(null);

  constructor() { }

  getTasks() {
    return this.tasks$;
  }

  addTask(name: string) {
    const tasks: TaskDto[] = this.tasks$.getValue() || [];
    
    this.tasks$.next([...tasks, {id: ++this.nextId, name}]);
  }

  updateTask(id: number, task: TaskDto) {
    const tasks: TaskDto[] = this.tasks$.getValue();

    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex] = task;

    this.tasks$.next(tasks);
  }

  removeTask(id: number) {
    const tasks: TaskDto[] = this.tasks$.getValue();

    this.tasks$.next(tasks.filter(task => task.id !== id));
  }
}
