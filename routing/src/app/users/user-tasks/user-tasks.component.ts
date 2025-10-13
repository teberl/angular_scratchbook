import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userName = input.required<string>();

  // private usersService = inject(UsersService);

  // Alternative to withComponentInputBinding
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    //   // ActivatedRoute vs ActivatedRouteSnapshot
    //   // ActivatedRoute is observable, ActivatedRouteSnapshot is not
    //   console.log('Snapshot', this.activatedRoute.snapshot);
    //   const subscription = this.activatedRoute.paramMap.subscribe({
    //     next: (params) => {
    //       console.log('Params changed:', params);
    //     },
    //   });
    const subscription = this.activeRoute.data.subscribe({
      next: (data) => {
        console.log('Data changed:', data);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // userName = computed(
  //   () =>
  //     this.usersService.users.find((user) => user.id === this.userId())?.name ||
  //     'Unknown User'
  // );
}

export const resolveUserName: ResolveFn<string> = (
  activeRoute: ActivatedRouteSnapshot,
  _routerState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  return (
    userService.users.find(
      (user) => user.id === activeRoute.paramMap.get('userId')
    )?.name || 'Unknown User'
  );
};

export const resolveUserTasksTitle: ResolveFn<string> = (
  activeRoute,
  _routerState
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (user) => user.id === activeRoute.paramMap.get('userId')
    )?.name || 'Unknown User';
  return `Tasks for ${userName}`;
};
