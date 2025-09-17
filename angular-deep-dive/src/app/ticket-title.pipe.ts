import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketTitle',
  standalone: true,
})
export class TicketTitlePipe implements PipeTransform {
  transform(value: string | number, ...args: any[]) {
    let result;

    if (typeof value === 'number') {
      result = `Ticket #${value}`;
    } else {
      result = value;
    }

    return `${result} (transformed)`;
  }
}
