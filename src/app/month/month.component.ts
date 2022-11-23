import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  private startDay: number;
  private month: number
  private selected: number
  private isLeapYear: boolean = false;
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
    this.startDay = day%7;
  }
  @Input('Month')
  set Month(month: number)
  {
    this.month = month;
  }
  @Input('IsLeapYear')
  set IsLeapYear(val: boolean)
  {
    this.isLeapYear = val
  }
  get StartDay() : number
  {
    return this.startDay;
  }
  get TotalDays(): number
  {
    return MonthComponent.daysOfMonth[this.month] + (this.month == 1 && this.isLeapYear ? 1 : 0);
  }
  get Weeks(): number
  {
    return Math.ceil((this.TotalDays + this.startDay)/7);
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
  public select(num: number)
  {
    console.log(num)
    if(this.selected == num)
      this.selected = -1;
    else
      this.selected = num;
  }
  ngOnInit(): void {
  }

}
