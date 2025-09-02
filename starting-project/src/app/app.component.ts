import { Component, signal } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import type { User } from './user/user.model';
import { TasksModule } from './tasks/tasks.module';

import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUser = signal<User | null>(null);

  onUserSelected({ id }: { id: string }) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      this.selectedUser.set(user);
    }
  }
}
