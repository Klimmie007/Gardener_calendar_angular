import { Component, Injectable, Inject, Input, OnInit } from '@angular/core';
import { day } from './day'

@Component({
  selector: 'app-day[Day]',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit
{
  private _isSelected: boolean;
  private day: day;
  constructor() {
    this.day = new day(0);
    this._isSelected = false;

  }
  @Input('Day')
  set Day(day: day)
  {
    this.day = day;
  }
  get Day(): day
  {
    return this.day;
  }
  public toggleSelect()
  {
    this._isSelected = !this._isSelected;
  }
  public isSelected(): boolean
  {
    return this._isSelected;
  }
  ngOnInit(): void {
  }
}
