import { Component, signal } from '@angular/core';

import { CounterControls } from './counter-controls/counter-controls';
import { CounterOutput } from './counter-output/counter-output';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CounterControls, CounterOutput],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('learning-ngrx');
}
