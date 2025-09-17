import { Component, inject, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ticket } from '../tickets.model';
import { TicketTitlePipe } from '../../../ticket-title.pipe';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [DatePipe, TicketTitlePipe],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class TicketComponent {
  private taskService = inject(TicketsService);

  data = input.required<Ticket>();

  isDetailsVisible = signal(false);

  onToggleDetails() {
    this.isDetailsVisible.update((isVisible) => !isVisible);
  }

  onMarkAsComplete() {
    this.taskService.onCloseTicket(this.data().id);
  }
}
