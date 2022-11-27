import { Component, Input, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  private startDay: number;
  private month: number
  private selected: number
  private year: number = -1;
  private isSelected: boolean = false
  private callback: (day: DayComponent, month: MonthComponent) => void = () => null;
  static daysOfMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  static daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; 
  static Months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  constructor() { 
    this.startDay = -1;
    this.month = -1;
    this.selected = -1;
  }
  @Input('FirstDay')
  set StartDay(day: number)
  {
    this.startDay = (day+7)%7;
  }
  @Input('Month')
  set Month(month: number)
  {
    this.month = month;
  }
  public get Month(): number
  {
    return this.month
  }
  @Input('Year')
  set Year(val: number)
  {
    this.year = val
  }
  public get Year(): number
  {
    return this.year
  }
  @Input('Callback')
  set Callback( callback: (day: DayComponent, month: MonthComponent) => void)
  {
    this.callback = callback
  }
  @Input('IsSelected')
  set IsSelected(val: boolean)
  {
    this.isSelected = val
    if(!val)
      this.selected = -1
  }
  get IsSelected() : boolean
  {
    return this.isSelected
  }
  get StartDay() : number
  {
    return this.startDay;
  }
  get TotalDays(): number
  {
    return MonthComponent.daysOfMonth[this.month] + (this.month == 1 && ((this.year%4 == 0 && this.year%100 != 0) || this.year%400 == 0) ? 1 : 0);
  }
  get Weeks(): number
  {
    return Math.ceil((this.TotalDays + this.startDay + 1)/7);
  }
  get DaysOfWeek() : string[]
  {
    return MonthComponent.daysOfWeek;
  }
  public get Title(): string
  {
    return MonthComponent.Months[this.month]
  }
  public get Selected(): number
  {
    return this.selected
  }
  public select(day: DayComponent)
  {
    if(this.selected == day.Day)
      this.selected = -1;
    else
      this.selected = day.Day;
    this.callback(day, this);
  }
  ngOnInit(): void {
  }

}
