import { Component } from '@angular/core';
import { Button } from '../shared/button/button';
import { SafeLinkDirective } from '../safe-link.directive';

@Component({
  selector: 'app-header',
  imports: [Button, SafeLinkDirective],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
