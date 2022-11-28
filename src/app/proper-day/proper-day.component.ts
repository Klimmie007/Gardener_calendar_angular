import { Component, Input } from '@angular/core';
import { CropsComponent } from '../crops/crops.component';
import { IPlant } from '../_models/plantInterface';
import { SowedPlant } from '../_models/sowedPlant';

@Component({
  selector: 'app-proper-day',
  templateUrl: './proper-day.component.html',
  styleUrls: ['./proper-day.component.css']
})
export class ProperDayComponent {
  private _sowedPlants: SowedPlant[] = [];
  public get sowedPlants(): SowedPlant[] {
    return this._sowedPlants;
  }
  @Input('crops')
  public set sowedPlants(value: SowedPlant[]) {
    this._sowedPlants = value;
  }
  private _plants: IPlant[] = [];
  public get plants(): IPlant[] {
    return this._plants;
  }
  @Input('plants')
  public set plants(value: IPlant[]) {
    this._plants = value;
  }
  private _day: Date = new Date();
  public get day(): Date {
    return this._day;
  }
  @Input('day')
  public set day(value: Date) {
    this._day = value;
  }
  public plantsToPlant(): string[]
  {
    let retVal: string[] = []
    this.sowedPlants.forEach(element => {
      if(element.date.getMonth() == this.day.getMonth() && element.date.getDate() == this.day.getDate())
      {
        retVal.push(element.plant.icon)
      }
    });
    return retVal
  }
  public plantsInSeason(): string[]
  {
    let retVal: string[] = []
    this.plants.forEach(element => {
      if(element.sowingSeason.end.getFullYear() == 2022 && (element.sowingSeason.start.getMonth() < this.day.getMonth() || 
          (this.day.getMonth() == element.sowingSeason.start.getMonth() && this.day.getDate() > element.sowingSeason.start.getDate())) && (element.sowingSeason.end.getMonth() > this.day.getMonth() || (this.day.getMonth() == element.sowingSeason.end.getMonth() && this.day.getDate() < element.sowingSeason.end.getDate())))
      {
        retVal.push(element.icon)
      }
      else if(element.sowingSeason.end.getFullYear() == 2023 && (element.sowingSeason.end.getMonth() > this.day.getMonth() || 
      (this.day.getMonth() == element.sowingSeason.end.getMonth() && this.day.getDate() > element.sowingSeason.end.getDate())))
      {
        retVal.push(element.icon)
      }
    })
    return retVal
  }
  public cropsToHarvest(): string[]
  {
    let retVal: string[] = []
    this.sowedPlants.forEach(element =>{
      if(element.plant.whenYields(element.date).end.getFullYear() == 2022 && (element.plant.whenYields(element.date).start.getMonth() < this.day.getMonth() || 
          (this.day.getMonth() == element.plant.whenYields(element.date).start.getMonth() && this.day.getDate() > element.plant.whenYields(element.date).start.getDate())) && (element.plant.whenYields(element.date).end.getMonth() > this.day.getMonth() || (this.day.getMonth() == element.plant.whenYields(element.date).end.getMonth() && this.day.getDate() < element.plant.whenYields(element.date).end.getDate())))
      {
        retVal.push(element.plant.icon)
      }
      else if(element.plant.whenYields(element.date).end.getFullYear() == 2023 && (element.plant.whenYields(element.date).end.getMonth() > this.day.getMonth() || 
      (this.day.getMonth() == element.plant.whenYields(element.date).end.getMonth() && this.day.getDate() > element.plant.whenYields(element.date).end.getDate())))
      {
        retVal.push(element.plant.icon)
      }
    })
    return retVal
  }
}
