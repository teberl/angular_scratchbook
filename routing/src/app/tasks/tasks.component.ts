import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  userTasks = input.required<Task[]>();

  // private taskService = inject(TasksService);

  // userTasks = computed(() =>
  //   this.taskService
  //     .allTasks()
  //     .filter(({ userId }) => userId === this.userId())
  //     .sort((a, b) => {
  //       if (this.order() === 'desc') {
  //         return a.id > b.id ? -1 : 1;
  //       }
  //       return a.id > b.id ? 1 : -1;
  //     })
  // );

  ngOnInit() {
    console.log('TasksComponent initialized with userId', this.userId());
  }
}
