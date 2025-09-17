import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Control } from '../../../shared/control/control';
import { Button } from '../../../shared/button/button';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [Control, Button, FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
})
export class NewTicket implements AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;

  // newer approach to use viewChild (17.3)
  // required is optional and we need to ensure the form element exists
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // add = output<{ title: string; text: string }>();
  taskService = inject(TicketsService);

  title = signal<string>('');
  request = signal<string>('');

  ngAfterViewInit() {
    // In this lifecycle hook, the viewChild(ren) is guaranteed to be available
    console.log('ngAfterViewInit');
    console.log(this.form().nativeElement);
  }

  onSubmit() {
    if (this.form().nativeElement.checkValidity() === false) {
      return;
    }
    // use the template variable to reset the form => #form
    // this.form().nativeElement.reset();
    this.taskService.onAddTicket({ title: this.title(), text: this.request() });

    this.title.set('');
    this.request.set('');
  }
}
