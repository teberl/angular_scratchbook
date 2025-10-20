import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  _routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};
