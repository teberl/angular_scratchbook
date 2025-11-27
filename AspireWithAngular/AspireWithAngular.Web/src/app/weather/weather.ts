import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ApiServiceClient, WeatherForecast } from '../api/_generated/apiService.client';


@Component({
  selector: 'app-weather',
  imports: [DatePipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class WeatherComponent {
  private weatherClient = inject(ApiServiceClient);

  forecasts = signal<WeatherForecast[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadWeatherData();

    effect(() => {
      // Runs when signals change
      console.log('Forecasts:', this.forecasts());
    });
  }

  private async loadWeatherData() {
    try {
      const data = await this.weatherClient.getWeatherForecast();
      this.forecasts.set(data);
      this.loading.set(false);
    } catch (err) {
      this.error.set('Failed to load weather data');
      this.loading.set(false);
      console.error(err);
    }
  }

}
