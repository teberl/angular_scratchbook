import { Component, signal } from '@angular/core';

import { NewTicket } from './new-ticket/new-ticket';
import { TicketComponent as TicketComponent } from './ticket/ticket';
import { Ticket } from './tickets.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicket, TicketComponent],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  tickets = signal<Ticket[]>([]);

  onAddTicket(ticket: { title: string; text: string }) {
    const newTicket: Ticket = {
      title: ticket.title,
      description: ticket.text,
      id: Math.random().toString(),
      status: 'open',
    };

    this.tickets.update((tickets) => [...tickets, newTicket]);
  }
}
