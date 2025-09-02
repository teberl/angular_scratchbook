import { Component, input } from '@angular/core';

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
}
