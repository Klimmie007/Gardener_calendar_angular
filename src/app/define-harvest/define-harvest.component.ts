import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Harvest } from '../_models/harvest';
import { IPlant, PlantType } from '../_models/plantInterface';
import { BackendService } from '../backend.service';
import { SowedPlant } from '../_models/sowedPlant';

@Component({
  selector: 'app-define-harvest',
  templateUrl: './define-harvest.component.html',
  styleUrls: ['./define-harvest.component.css'],
  providers: [BackendService],
})
export class DefineHarvestComponent implements OnInit{
  private _Crops: SowedPlant[] = [];
  public get Crops(): SowedPlant[] {
    return this._Crops;
  }
  @Input('crops')
  public set Crops(value: SowedPlant[]) {
    this._Crops = value;
  }
  private _index: number = 0;
  public get index(): number {
    return this._index;
  }
  @Input('index')
  public set index(value: number) {
    this._index = value;
    this._weight = this.Crops[value].plant.expectedYieldInkg
  }
  private _harvestDate: Date = new Date();
  public get harvestDate(): Date {
    return this._harvestDate;
  }
  public set harvestDate(value: Date) {
    this._harvestDate = value;
  }
  private _isToday: boolean = true;
  public get isToday(): boolean {
    return this._isToday;
  }
  public set isToday(value: boolean) {
    if(value)
    {
      this.harvestDate = new Date()
    }
    this._isToday = value;
  }
  private _weight: number = 0;
  public get weight(): number {
    return this._weight;
  }
  public set weight(value: number) {
    let valString: string = (value as unknown) as string
    if(valString.length == 0)
    {
      this.Error = "Weight is required"
    }
    else if ((valString.match(/^([1-9][0-9]*||[0-9]+\.[0-9]+)$/g)?.length || 0) <= 0)
    {
      this.Error = "This is not a valid weight"
    }
    else
    {
      this.Error = ""
    }
    this._weight = value;
  }
  private _Error: string = "";
  public get Error(): string {
    return this._Error;
  }
  public set Error(value: string) {
    this._Error = value;
  }
  private auth: BackendService;

  constructor(auth: BackendService) {
    this.auth = auth;
  }

  ngOnInit() {
  }


  defineHarvest() {
    if(this.Crops[this.index] && this.Error == "") {

      let harvest: Harvest = new Harvest(this.weight, this.Crops[this.index].plant, this.harvestDate);

      this.auth.addHarvest(harvest, this.Crops[this.index]. id).subscribe(res => {
        console.log(res);
        delete this.Crops[this.index]
      }, err => {
        if(err instanceof HttpErrorResponse) {
          alert(err.error);
        }
        else {
          console.log(err);
        }
      });
      
    }
    else
    {
      alert(this.Error)
    }
  }

  resetForm(formModel: FormGroup) {
    formModel.reset();
  }
}
