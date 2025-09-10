import { Component } from '@angular/core';

import { Header } from './header/header';
import { ServerStatusComponent } from './dashboard/server-status/server-status';
import { Traffic } from './dashboard/traffic/traffic';
import { Tickets } from './dashboard/tickets/tickets';
import { DashboardItem } from './dashboard/dashboard-item/dashboard-item';
import { AuthDirective } from './auth/auth.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    ServerStatusComponent,
    Traffic,
    Tickets,
    DashboardItem,
    AuthDirective,
  ],
  templateUrl: './app.html',
})
export class AppComponent {}
