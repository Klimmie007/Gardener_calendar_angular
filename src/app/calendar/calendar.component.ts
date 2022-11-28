import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { DayComponent } from '../day/day.component';
import { MonthComponent } from '../month/month.component';
import { IPlant } from '../_models/plantInterface';
import { SowedPlant } from '../_models/sowedPlant';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [BackendService]
})
export class CalendarComponent implements OnInit {
  private today: Date = new Date;
  private selectedDate: Date = new Date(NaN)
  private months: MonthComponent[] = []
  private _Years: number[] = [this.today.getFullYear()];
  private _plants: IPlant[] = [];
  public get plants(): IPlant[] {
    return this._plants;
  }
  public set plants(value: IPlant[]) {
    this._plants = value;
  }
  private _sowedPlants: SowedPlant[] = [];
  public get sowedPlants(): SowedPlant[] {
    return this._sowedPlants;
  }
  public set sowedPlants(value: SowedPlant[]) {
    this._sowedPlants = value;
  }
  private celsius: boolean = true;
  private fahrenheit: boolean = false;

  get Celsius(): boolean {
    return this.celsius;
  }

  get Fahrenheit(): boolean {
    return this.fahrenheit;
  }

  changeTemp() {
    if(this.celsius && !this.fahrenheit) {
      this.celsius = false;
      this.fahrenheit = true;
    }
    else {
      this.celsius = true;
      this.fahrenheit = false;
    }
  }

  public get Years(): number[] {
    return this._Years;
  }
  public set Year(value: number[]) {
    this._Years = value;
  }
  private _Month: number = this.today.getMonth();
  public get Month(): number {
    return this._Month;
  }
  public set Month(value: number) {
    this._Month = value;
  }
  public get Months(): MonthComponent[]
  {
    return this.months
  }
  public getStartDay(month: number, year: number): number
  {
    return new Date((month+1)+'/1/'+year).getDay()-1
  }
  public isLeapYear(year: number)
  {
    return year%4 == 0 ? (year%100 == 0 ? (year%400 == 0 ? true : false) : true) : false
  }
  public callback(month: MonthComponent)
  {
    this.selectedDate = new Date((month.Month+1)+'/'+month.Selected+'/'+month.Year)
  }
  get SelectedDate(): Date
  {
    return this.selectedDate
  }
  get IsValidDate(): boolean
  {
    return !isNaN(this.selectedDate.valueOf());
  }
  public genPrevious()
  {
    if(this.Month != 0)
    {
      this._Month = 0
    }
    else
    {
      this._Years.unshift(this._Years[0]-1)
    }
    this.ngOnInit()
  }
  public genNext()
  {
    this._Years.push(this._Years[this.Years.length-1]+1)
  }
  constructor(private backend: BackendService) {
    this.plants = backend.getPlants()
    this.sowedPlants = backend.getSowedPlants()
  }

  ngOnInit(): void {
  }

}
