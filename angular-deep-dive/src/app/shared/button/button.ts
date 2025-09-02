import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  host: {
    '(click)': 'onClick()',
  },
})
export class Button {
  // get programmatic access to the component host element
  private el = inject(ElementRef);

  onClick() {
    console.log(this.el);
    console.log('Button clicked');
  }
}
