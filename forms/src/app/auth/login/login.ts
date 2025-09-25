import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value && control.value.includes('?')) {
    return null;
  }

  return { mustContainQuestionMark: true };
}

function emailIsUniqueAsync(control: AbstractControl) {
  if (control.value !== 'test@mail.de') {
    return of(null);
  }

  return of({ emailIsUniqueAsync: true });
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('app-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
      asyncValidators: [emailIsUniqueAsync],
    }),
  });

  get emailIsInvalid() {
    return (
      this.loginForm.controls.email.invalid &&
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.loginForm.controls.password.invalid &&
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty
    );
  }

  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('app-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.loginForm.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.loginForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem('app-login-form', JSON.stringify(value));
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // this.loginForm.value.email;
    console.log(this.loginForm);
  }
}
