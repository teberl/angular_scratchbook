import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUserName,
  resolveUserTasksTitle,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/users.routes';

const dummyCanMatch: CanMatchFn = (_route, _segments) => {
  const router = inject(Router);
  const shouldMatch = Math.random() > 0.1; // 90% chance to match

  if (shouldMatch) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const appRoutes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    // redirectTo: 'users/u1',
    // pathMatch: 'full',
    title: 'No Tasks',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    // static data
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveUserTasksTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
