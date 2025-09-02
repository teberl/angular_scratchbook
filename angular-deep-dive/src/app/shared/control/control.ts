import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ElementRef,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class Control implements AfterContentInit {
  label = input.required<string>();

  private children? =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('After Control rendered');
    });

    afterNextRender(() => {
      console.log('After Control next rendered');
    });
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    if (this.children) {
      console.log(this.children()?.nativeElement);
    }
  }

  onClick() {
    // Handle click event
    console.log('Control clicked');
    if (this.children) {
      console.log(this.children()?.nativeElement);
    }
  }
}
