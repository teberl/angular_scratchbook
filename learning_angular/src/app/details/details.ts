import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Housing } from "../housing.service";
import { IHousingLocationInfo } from "../IHousingLocation";

@Component({
  selector: "app-details",
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          @if (firstName.invalid && (firstName.dirty || firstName.touched) ) {
          <div class="alert alert-danger">
            @if (firstName.hasError('required')) {
            <div>FirstName is required.</div>
            } @if (firstName.hasError('minlength')) {
            <div>FirstName must be at least 3 characters long.</div>
            }
          </div>
          }
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          @if (email.invalid && (email.dirty || email.touched) ) {
          <div class="alert alert-danger">
            @if (email.hasError('email')) {
            <div>This is not a valid email.</div>
            }
          </div>
          }
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.css"],
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: Housing = inject(Housing);
  private formBuilder = inject(FormBuilder);
  housingLocation: IHousingLocationInfo | undefined;

  applyForm = this.formBuilder.group({
    firstName: [, [Validators.required, Validators.minLength(3)]],
    lastName: [, [Validators.required, Validators.minLength(3)]],
    email: [, [Validators.email]],
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  get firstName() {
    return this.applyForm.get("firstName") as FormControl;
  }

  get email() {
    return this.applyForm.get("email") as FormControl;
  }

  submitApplication() {
    this.applyForm.markAllAsTouched();

    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
