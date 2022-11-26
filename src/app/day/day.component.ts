import { outputAst } from '@angular/compiler';
import { Component, Injectable, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit
{
  color = 'cyan';
  private day: number;
  private isSelected: boolean;
  constructor() {
    this.day = 0;
    this.isSelected = false;
  }
  @Input('DayNumber')
  set Day(day: number)
  {
    this.day = day;
  }
  @Input('IsSelected')
  set IsSelected(val: boolean)
  {
    this.isSelected = val
  }
  get IsSelected(): boolean
  {
    return this.isSelected
  }
  get Day(): number
  {
    return this.day;
  }
  ngOnInit(): void {
  }
}
