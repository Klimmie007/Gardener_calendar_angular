import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-future-weather',
  templateUrl: './future-weather.component.html',
  styleUrls: ['./future-weather.component.css']
})
export class FutureWeatherComponent implements OnInit {
  private weatherData: any = [];

  constructor(private weatherService: WeatherService) { }

  get WeatherData(): any {
    return this.weatherData;
  }

  ngOnInit(): void {
    this.weatherService.getWeatherForecast().pipe(pluck('list')).subscribe(data => {
      this.futureForecast(data);
    });
  }

  futureForecast(data: any) {
    for(let i = 0; i < data.length; i = i + 8) {
      this.weatherData.push(data[i]);
    }
  }
}
