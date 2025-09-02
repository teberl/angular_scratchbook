import { Injectable } from "@angular/core";
import { IHousingLocationInfo } from "./IHousingLocation";

@Injectable({
  providedIn: "root",
})
export class Housing {
  url = "http://localhost:3000/locations";

  async getAllHousingLocations(): Promise<IHousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<IHousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
