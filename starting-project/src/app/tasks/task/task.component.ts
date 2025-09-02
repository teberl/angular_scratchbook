import { Component, inject, input } from '@angular/core';

import { Task } from './task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input.required<Task>();

  private taskService = inject(TasksService);

  onCompleteTask() {
    this.taskService.removeTask(this.task().id);
  }
}
