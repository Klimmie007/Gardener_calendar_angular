import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private today: Date = new Date;
  private _Year: number = this.today.getFullYear();
  public get Year(): number {
    return this._Year;
  }
  public set Year(value: number) {
    this._Year = value;
  }
  private _Month: number = this.today.getMonth();
  public get Month(): number {
    return this._Month;
  }
  public set Month(value: number) {
    this._Month = value;
  }
  public getStartDay(month: number, year: number): number
  {
    return new Date((month+1)+'/1/'+year).getDay()-1
  }
  public isLeapYear(year: number)
  {
    return year%4 == 0 ? (year%100 == 0 ? (year%400 == 0 ? true : false) : true) : false
  }
  constructor() { 

  }

  ngOnInit(): void {
  }

}
