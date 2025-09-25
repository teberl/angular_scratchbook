import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function passwordMatcher(control: AbstractControl) {
  const parent = control.parent;
  const password = parent ? parent.get('password')?.value : null;
  return control.value === password ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, passwordMatcher],
    }),
  });

  get emailIsInvalid() {
    console.log(this.form.controls.email.invalid);
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }

  get passwordMismatch() {
    return (
      this.form.controls.confirmPassword.errors?.['passwordMismatch'] &&
      this.form.controls.confirmPassword.touched &&
      this.form.controls.confirmPassword.dirty
    );
  }

  onReset() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
