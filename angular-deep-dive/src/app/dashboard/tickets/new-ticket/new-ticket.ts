import {
  AfterViewInit,
  Component,
  ElementRef,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Control } from '../../../shared/control/control';
import { Button } from '../../../shared/button/button';

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

  add = output<{ title: string; text: string }>();

  ngAfterViewInit() {
    // In this lifecycle hook, the viewChild(ren) is guaranteed to be available
    console.log('ngAfterViewInit');
    console.log(this.form().nativeElement);
  }

  onSubmit(title: string, text: string) {
    // Handle form submission
    console.log('Form submitted');

    this.form().nativeElement.reset();
    this.add.emit({ title, text });
  }
}
