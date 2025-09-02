import { Component } from '@angular/core';
import { Button } from '../shared/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
