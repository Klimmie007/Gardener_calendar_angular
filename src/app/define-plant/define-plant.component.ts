import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { IPlant, PlantType } from '../_models/plantInterface';

@Component({
  selector: 'app-define-plant',
  templateUrl: './define-plant.component.html',
  styleUrls: ['./define-plant.component.css']
})
export class DefinePlantComponent implements OnInit {
  private _sowingRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public get sowingRange() {
    return this._sowingRange;
  }
  public set sowingRange(value) {
    this._sowingRange = value;
  }
  private _yieldDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public get yieldDateRange() {
    return this._yieldDateRange;
  }
  public set yieldDateRange(value) {
    this._yieldDateRange = value;
  }
  private _expectedYield: number = 0;
  public get expectedYield(): number {
    return this._expectedYield;
  }
  public set expectedYield(value: number) {
    this._expectedYield = value;
  }
  public get PlantTypeEnum()
  {
    return PlantType
  }
  private _type: string = PlantType.Plant;
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }
  private _plantTypes: string[] = [PlantType.Plant, PlantType.Bush, PlantType.Tree];
  public get plantTypes(): string[] {
    return this._plantTypes;
  }
  public set plantTypes(value: string[]) {
    this._plantTypes = value;
  }
  private icon: string = ""
  private iconError: string = ""
  private _dateRangeError: string = "";
  public get dateRangeError(): string {
    return this._dateRangeError;
  }
  public set dateRangeError(value: string) {
    this._dateRangeError = value;
  }
  private _sowingStartDate: Date = new Date;
  public get sowingStartDate(): Date {
    return this._sowingStartDate;
  }
  public set sowingStartDate(value: Date) {
    this._sowingStartDate = value;
  }
  private _sowingEndDate: Date = new Date;
  public get sowingEndDate(): Date {
    return this._sowingEndDate;
  }
  public set sowingEndDate(value: Date) {
    this._sowingEndDate = value;
  }
  
  constructor() {
    this.sowingRange.valueChanges.subscribe({
      next: value => {
        if(value.start)
        {
          value.start.setFullYear(2022)
          if(value.end)
            value.end.setFullYear(value.start.getMonth() > value.end.getMonth() || (value.start.getMonth() == value.end.getMonth() && value.start.getDate() > value.end.getDate()) ? 2023 : 2022)
        }
      }
    })
  }

  public get Icon(): string
  {
    return this.icon
  }
  public set Icon(val:string)
  {
    this.icon = val
  }

  public onLoad(event: Event)
  {
    this.iconError = ""
  }

  public onError(event: Event)
  {
    this.iconError = "OwO"
  }

  public get IconError(): string
  {
    return this.iconError
  }
  exampleHeader = ExampleHeader

  public onSubmit()
  {

  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'example-header',
  styles: [
    `
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }
  `,
  ],
  template: `
  
    <div class="example-header">
      <button mat-icon-button (click)="previousClicked()">
        <
      </button>
      
      <button mat-icon-button (click)="nextClicked()">
        >
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
  }
}