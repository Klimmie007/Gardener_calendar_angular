import { TypeModifier } from '@angular/compiler';
import { Component, Inject, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Bush } from '../_models/bush';
import { GardenPatch } from '../_models/gardenPatch';
import { Plant } from '../_models/plant';
import { IPlant, PlantType } from '../_models/plantInterface';
import { SowedPlant } from '../_models/sowedPlant';
import { Tree } from '../_models/tree';

@Component({
  selector: 'app-sow',
  templateUrl: './sow.component.html',
  styleUrls: ['./sow.component.css'],
  providers: [BackendService]
})
export class SowComponent {
  private _sowedPlants: SowedPlant[] = [];
  public get sowedPlants(): SowedPlant[] {
    return this._sowedPlants;
  }
  @Input('list')
  public set sowedPlants(value: SowedPlant[]) {
    this._sowedPlants = value;
  }
  private _isToday: boolean = true;
  public get isToday(): boolean {
    return this._isToday;
  }
  public set isToday(value: boolean) {
    if(value)
    {
      this.date = new Date()
    }
    this._isToday = value;
  }
  private _date: Date = new Date;
  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
  private _patches: GardenPatch[] = [];
  public get patches(): GardenPatch[] {
    return this._patches;
  }
  public set patches(value: GardenPatch[]) {
    this._patches = value;
  }
  private _plants: IPlant[] = [];
  public get plants(): IPlant[] {
    return this._plants;
  }
  public set plants(value: IPlant[]) {
    this._plants = value;
  }
  private _Error: string = "Patch and plant are required";
  public get Error(): string {
    return this._Error;
  }
  public set Error(value: string) {
    this._Error = value;
  }
  private _chosenPatch?: GardenPatch | undefined;
  public get chosenPatch(): GardenPatch | undefined {
    return this._chosenPatch;
  }
  public set chosenPatch(value: GardenPatch | undefined) {
    if((this.chosenPlant instanceof Plant && value?.Type == PlantType.Plant) || (this.chosenPlant instanceof Bush && value?.Type == PlantType.Bush) || (this.chosenPlant instanceof Tree && value?.Type == PlantType.Tree))
    {
      this.Error = ""
    }
    else
    {
      this.Error = "You cannot plant " + this.getTypeAsString(this.chosenPlant) + " at a patch of " + value?.Type;
    }
    this._chosenPatch = value;
  }
  private _chosenPlant?: IPlant;
  public get chosenPlant(): IPlant | undefined {
    return this._chosenPlant;
  }
  public set chosenPlant(value: IPlant | undefined) {
    if((value instanceof Plant && this.chosenPatch?.Type == PlantType.Plant) || (value instanceof Bush && this.chosenPatch?.Type == PlantType.Bush) || (value instanceof Tree && this.chosenPatch?.Type == PlantType.Tree))
    {
      this.Error = ""
    }
    else
    {
      this.Error = "You cannot plant " + this.getTypeAsString(value) + " at a patch of " + this.chosenPatch?.Type;
    }
    this._chosenPlant = value;
  }

  public getTypeAsString(plant: IPlant | undefined): string
  {
    if(plant instanceof Plant)
    {
      return "Plant"
    }
    else if (plant instanceof Bush)
    {
      return "Bush"
    }
    else if (plant instanceof Tree)
    {
      return "Tree"
    }
    return ""
  }

  constructor(private backend: BackendService)
  {
    backend.getGardenPatches().subscribe(
      res => {
        for(let i = 0; i < res.length; ++i) {
          this.patches.push(new GardenPatch(res[i].name, res[i].type, res[i].amount, res[i]._id));
        }
      }
    )
    this.plants = backend.getPlants()
  }

  public OnSubmit()
  {
    if(this.Error != "")
    {
      alert(this.Error)
      return
    }
    if(!this._chosenPatch || !this.chosenPlant)
    {
      return;
    }
    let tmp: SowedPlant = new SowedPlant(this._chosenPatch, this.chosenPlant, this.date)
    this.backend.addSowedPlant(tmp)
    this.sowedPlants.push(tmp)
  }
}
