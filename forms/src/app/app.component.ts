import { Component } from '@angular/core';

import { Login } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [Login, SignupComponent],
})
export class AppComponent {}
