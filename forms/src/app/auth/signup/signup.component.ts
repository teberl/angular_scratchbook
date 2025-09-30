import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// function passwordMatcher(control: AbstractControl) {
//   const parent = control.parent;
//   const password = parent ? parent.get('password')?.value : null;
//   return control.value === password ? null : { passwordMismatch: true };
// }

// Factory function that returns a validator function
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const password = control.get(controlName1)?.value;
    const confirmPassword = control.get(controlName2)?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
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
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { validators: [equalValues('password', 'confirmPassword')] }
    ),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<
      'student' | 'employee' | 'teacher' | 'founder' | 'other'
    >('employee', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.passwords.controls.password.invalid &&
      this.form.controls.passwords.controls.password.touched &&
      this.form.controls.passwords.controls.password.dirty
    );
  }

  get passwordMismatch() {
    return (
      this.form.controls.passwords.errors?.['passwordMismatch'] &&
      this.form.controls.passwords.controls.confirmPassword.touched
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
