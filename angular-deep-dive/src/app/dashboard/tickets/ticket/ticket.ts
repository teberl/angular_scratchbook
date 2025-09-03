import { Component, input, output, signal } from '@angular/core';

import { Ticket } from '../tickets.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  close = output();
  isDetailsVisible = signal(false);

  onToggleDetails() {
    this.isDetailsVisible.update((isVisible) => !isVisible);
  }

  onMarkAsComplete() {
    this.close.emit();
  }
}
