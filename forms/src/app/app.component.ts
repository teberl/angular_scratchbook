import { Component } from '@angular/core';

import { Login } from './auth/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [Login],
})
export class AppComponent {}
