import { Injectable, signal } from '@angular/core';

import { Ticket } from './tickets.model';

// @Injectable({
//   providedIn: 'root',
// })
export class TicketsService {
  private tickets = signal<Ticket[]>([
    {
      id: 't1',
      title: 'My first ticket',
      description: 'This is the description of my first ticket',
      status: 'open',
      createdAt: new Date(),
    },
  ]);

  allTickets = this.tickets.asReadonly();

  onAddTicket(ticket: { title: string; text: string }) {
    const newTicket: Ticket = {
      title: ticket.title,
      description: ticket.text,
      id: Math.random().toString(),
      status: 'open',
      createdAt: new Date(),
    };

    this.tickets.update((tickets) => [...tickets, newTicket]);
  }

  onCloseTicket(id: string) {
    this.tickets.update((tickets) =>
      tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: 'closed', completedAt: new Date() }
          : ticket
      )
    );
  }
}
