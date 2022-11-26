import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  private timeline: any[] = [];
  private weatherNow: any;
  private currentTime = new Date();
  private location: any;

  constructor(private weatherService: WeatherService) { }

  get Timeline(): any[] {
    return this.timeline;
  }

  get WeatherNow(): any {
    return this.weatherNow;
  }

  get CurrentTime(): Date {
    return this.currentTime;
  }

  get Location(): any {
    return this.location;
  }

  ngOnInit(): void {
    this.weatherService.getWeatherForecast().subscribe(data => {
      this.getTodayforecast(data);
    });
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + (start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return {start, to};
  }

  getTodayforecast(today: any) {
    this.location = today.city;

    for(const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp
      });

      const apiDate = new Date(forecast.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
        this.weatherNow = forecast;
        //console.log(this.weatherNow);
      }
    }
  }
}
