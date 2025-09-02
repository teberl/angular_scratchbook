import { Component, computed, inject, input, signal } from '@angular/core';

import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  userId = input.required<string>();
  name = input.required<string>();

  private tasksService = inject(TasksService);

  isAddTaskVisible = signal(false);

  readonly selectedUserTasks = computed(() =>
    this.tasksService.getUserTasks(this.userId())
  );

  onStartAddTask() {
    this.isAddTaskVisible.set(true);
  }

  onCloseAddTask() {
    this.isAddTaskVisible.set(false);
  }

  onSubmitAddTask() {
    this.isAddTaskVisible.set(false);
  }
}
