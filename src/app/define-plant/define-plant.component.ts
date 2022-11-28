import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
  Input,
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange, IPlant, PlantType } from '../_models/plantInterface';
import { Router } from 'express';
import { BackendService } from '../backend.service';
import { Plant } from '../_models/plant';
import { Bush } from '../_models/bush';
import { Tree } from '../_models/tree';

@Component({
  selector: 'app-define-plant',
  templateUrl: './define-plant.component.html',
  styleUrls: ['./define-plant.component.css'],
  providers: [BackendService]
})
export class DefinePlantComponent implements OnInit {
  @Input('list')
  set list(list: IPlant[])
  {
    this._list = list
  }
  private _list: IPlant[] = [];

  private _nameError: string = "Name is required";
  public get nameError(): string {
    return this._nameError;
  }
  public set nameError(value: string) {
    this._nameError = value;
  }
  private _name: string = "";
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    if(value == "")
    {
      this.nameError = "Name is required"
    }
    else
    {
      this.nameError = ""
    }
    this._name = value;
  }
  private _sowingRange = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });
  private _minVegetationTimeError: string = "The value has to be higher than 0";
  public get minVegetationTimeError(): string {
    return this._minVegetationTimeError;
  }
  public set minVegetationTimeError(value: string) {
    this._minVegetationTimeError = value;
  }
  private _minVegetationTime: number = 0;
  public get minVegetationTime(): number {
    return this._minVegetationTime;
  }
  public set minVegetationTime(value: number) {
    let valString = (value as unknown) as string
    if(valString.length == 0)
    {
      this.minVegetationTimeError = "value cannot be empty"
    }
    else if ((valString.match(/^[1-9][0-9]*$/g)?.length || 0) <= 0)
    {
      this._minVegetationTimeError = "value is not numeric"
    }
    else
    {
      this._minVegetationTimeError = ""
    }
    this._minVegetationTime = value;
  }
  private _maxVegetationTimeError: string = "The value has to be higher than 0";
  public get maxVegetationTimeError(): string {
    return this._maxVegetationTimeError;
  }
  public set maxVegetationTimeError(value: string) {
    this._maxVegetationTimeError = value;
  }
  private _maxVegetationTime: number = 0;
  public get maxVegetationTime(): number {
    return this._maxVegetationTime;
  }
  public set maxVegetationTime(value: number) {
    let valString = (value as unknown) as string
    if(valString.length == 0)
    {
      this.maxVegetationTimeError = "value cannot be empty"
    }
    else if ((valString.match(/^[1-9][0-9]*$/g)?.length || 0) <= 0)
    {
      this._maxVegetationTimeError = "value is not numeric"
    }
    else if(value < this.minVegetationTime)
    {
      this._maxVegetationTimeError = "max value has to be at least equal min value"
    }
    else
    {
      this._maxVegetationTimeError = ""
    }
    this._maxVegetationTime = value;
  }
  public get sowingRange() {
    return this._sowingRange;
  }
  public set sowingRange(value) {
    this._sowingRange = value;
  }
  private _yieldDateRange = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });
  public get yieldDateRange() {
    return this._yieldDateRange;
  }
  public set yieldDateRange(value) {
    this._yieldDateRange = value;
  }
  private _expectedYieldError: string = "value has to be higher than 0";
  public get expectedYieldError(): string {
    return this._expectedYieldError;
  }
  public set expectedYieldError(value: string) {
    this._expectedYieldError = value;
  }
  private _expectedYield: number = 0;
  public get expectedYield(): number {
    return this._expectedYield;
  }
  public set expectedYield(value: number) {
    let valString = (value as unknown) as string
    if(valString == "")
    {
      this.expectedYieldError = "value cannot be empty"
    }
    else if ((valString.match(/^([1-9][0-9]*||[0-9]+\.[0-9]+)$/g)?.length || 0) <= 0)
    {
      this.expectedYieldError = "value is not numeric"
    }
    else
    {
      this.expectedYieldError = ""
    }
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
  private _image: string = "";
  public get image(): string {
    return this._image;
  }
  public set image(value: string) {
    this._image = value;
  }
  private iconError: string = ""
  private _dateRangeError: string = "";
  public get dateRangeError(): string {
    return this._dateRangeError;
  }
  
  constructor(private backend: BackendService) {
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

  private _imageError: string = "";
  public get imageError(): string {
    return this._imageError;
  }
  public set imageError(value: string) {
    this._imageError = value;
  }

  public get Icon(): string
  {
    return this.icon
  }
  public set Icon(val:string)
  {
    this.icon = val
  }

  public onLoadIcon(event: Event)
  {
    this.iconError = ""
  }

  public onErrorIcon(event: Event)
  {
    this.iconError = "The link does not lead to a valid image"
  }

  public onLoadImage(event: Event)
  {
    this.imageError = ""
  }

  public onErrorImage(event: Event)
  {
    this.imageError = "The link does not lead to a valid image"
  }

  public get IconError(): string
  {
    return this.iconError
  }
  exampleHeader = ExampleHeader

  public onSubmit()
  {
    if(this.imageError !== "")
    {
      alert(this.imageError)
      return
    }
    if(this.iconError !== "")
    {
      alert(this.IconError)
      return
    }
    if(!this.sowingRange.value.end || !this.sowingRange.value.start)
    {
      alert("sowing range is required")
      return
    }
    if(this._expectedYieldError != "")
    {
      alert(this._expectedYieldError)
      return
    }
    if(this.minVegetationTimeError != "" && this.type == PlantType.Plant)
    {
      alert(this.minVegetationTimeError)
      return
    }
    if(this.maxVegetationTimeError != "" && this.type == PlantType.Plant)
    {
      alert(this.maxVegetationTimeError)
      return
    }
    let tmp: IPlant
    switch(this.type)
    {
      case PlantType.Plant:
      {
        tmp = new Plant(new DateRange(this.sowingRange.value.start, this.sowingRange.value.end),  this.minVegetationTime, this.maxVegetationTime, this.expectedYield, this.name, this.image, this.Icon)
        break;
      }
      case PlantType.Bush:
      {
        if(!this.yieldDateRange.value.start || !this.yieldDateRange.value.end)
        {
          alert('yield dates are required')
          return
        }
        tmp = new Bush(new DateRange(this.sowingRange.value.start, this.sowingRange.value.end),  new DateRange(this.yieldDateRange.value.start, this.yieldDateRange.value.end), this.expectedYield, this.name, this.image, this.Icon)
        break
      }
      default:
      {
        if(!this.yieldDateRange.value.start || !this.yieldDateRange.value.end)
        {
          alert('yield dates are required')
          return
        }
        tmp = new Tree(new DateRange(this.sowingRange.value.start, this.sowingRange.value.end),  new DateRange(this.yieldDateRange.value.start, this.yieldDateRange.value.end), this.expectedYield, this.name, this.image, this.Icon)
        break
      }
    }
    this._list.push(tmp)
    this.backend.addPlant(tmp);
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