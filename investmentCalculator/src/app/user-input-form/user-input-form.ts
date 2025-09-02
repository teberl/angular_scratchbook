import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input-form.html',
  styleUrl: './user-input-form.css',
})
export class UserInputForm {
  private investmentService = inject(InvestmentService);
  investmentForm = new FormGroup({
    initialInvestment: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    annualInvestment: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    expectedReturn: new FormControl<number | null>(5, [
      Validators.required,
      Validators.min(0),
    ]),
    duration: new FormControl<number | null>(10, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  onSubmit() {
    if (this.investmentForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.investmentService.calculateInvestmentResults({
      annualInvestment: this.investmentForm.value.annualInvestment!,
      duration: this.investmentForm.value.duration!,
      expectedReturn: this.investmentForm.value.expectedReturn!,
      initialInvestment: this.investmentForm.value.initialInvestment!,
    });
  }
}
