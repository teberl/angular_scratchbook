import { Component, inject } from '@angular/core';

import { NewTicket } from './new-ticket/new-ticket';
import { TicketComponent } from './ticket/ticket';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicket, TicketComponent],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
  // Element service injection scope, the service is only available to this component and its children
  // adding a second component that also provides the service would create a separate instance of the service
  providers: [TicketsService],
})
export class Tickets {
  private ticketService = inject(TicketsService);

  tickets = this.ticketService.allTickets;
}
