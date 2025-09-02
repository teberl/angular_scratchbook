import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { UserInputForm } from './user-input-form/user-input-form';
import { ResultsTable } from './results-table/results-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, UserInputForm, ResultsTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
