import { Directive, ElementRef, inject, input } from '@angular/core';

// Attribute directive
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  public queryParam = input<string>('myApp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective initialized');
  }

  onConfirmLeavePage(event: MouseEvent): void {
    const wantsToLeave = window.confirm(
      'Are you sure you want to leave this page?'
    );

    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      // (
      //   event.target as HTMLAnchorElement
      // ).href = `${address}?from=${this.queryParam()}`;

      // Alternatively, we can also use the injected ElementRef
      this.hostElementRef.nativeElement.href = `${
        this.hostElementRef.nativeElement.href
      }?from=${this.queryParam()}`;
      return;
    }

    event.preventDefault();
  }
}
