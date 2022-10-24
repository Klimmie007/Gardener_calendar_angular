import { Component, Input, OnInit } from '@angular/core';
import { day } from '../day/day';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  private startDay: number;
  private days: day[];
  daysOfWeek: String[]; 
  constructor() { 
    this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    this.startDay = -1;
    this.days = [];
  }
  @Input('FirstDay')
  set StartDay(day: number)
  {
    this.startDay = day%7;
  }
  @Input('TotalDays')
  set setDays(days: number)
  {
    for(let i = 1; i <= days; i++)
    {
      this.days.push(new day(i));
    }
  }
  get StartDay() : number
  {
    return this.startDay;
  }
  get Days(): day[]
  {
    return this.days;
  }
  get Weeks(): number
  {
    return Math.ceil((this.days.length + this.startDay + 1)/7);
  }

  ngOnInit(): void {
  }

}
