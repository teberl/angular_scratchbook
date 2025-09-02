import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

type ServerStatus = 'online' | 'offline' | 'unknown';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<ServerStatus>('online');
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect((onCleanUp) => {
      console.log('Current status:', this.currentStatus());

      // define what should happen before the effect code runs the next time
      onCleanUp(() => {
        console.log('Cleaning up currentStatus effect ... ');
      });
    });
  }

  ngOnInit() {
    console.log('onInit ServerStatusComponent');
    const interval = setInterval(() => {
      this.currentStatus.set(this.getRandomStatus());
    }, 3000);

    // more modern approach to ngOnDestroy
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  // legacy ngOnDestroy => use destroyRef.onDestroy instead
  // ngOnDestroy(): void {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //   }
  // }

  private getRandomStatus(): ServerStatus {
    const statuses: ServerStatus[] = ['online', 'offline', 'unknown'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
}
