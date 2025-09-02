import { Injectable, signal } from '@angular/core';

import { AddTaskData, Task } from './task/task.model';

import { dummyTasks } from './dummy-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksSignal = signal<Task[]>(dummyTasks);

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasksSignal.set(JSON.parse(tasks));
    }
  }

  getUserTasks(userId: string): Task[] {
    return this.tasksSignal().filter((task) => task.userId === userId) ?? [];
  }

  addTask(taskData: AddTaskData, userId: string): void {
    const newTask: Task = {
      id: `t${new Date().getTime().toString()}`,
      userId: userId,
      ...taskData,
    };
    this.tasksSignal.update((tasks) => [newTask, ...tasks]);
    this.saveTasksToLocalStorage();
  }

  removeTask(taskId: string): void {
    this.tasksSignal.update((tasks) =>
      tasks.filter((task) => task.id !== taskId)
    );
    this.saveTasksToLocalStorage();
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSignal()));
  }
}
