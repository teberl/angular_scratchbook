import { Routes } from '@angular/router';

import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { resolveUserTasks } from '../tasks/tasks.resolver';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';

export const userRoutes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix',
      },
      {
        path: 'tasks',
        component: TasksComponent,
        // lazy loading the component
        // loadComponent: async () =>
        //   import('../tasks/tasks.component').then((m) => m.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
