import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { IPlant } from '../_models/plantInterface';
import { Plant } from '../_models/plant';
import { Bush } from '../_models/bush';
import { Tree } from '../_models/tree';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  private _plants: IPlant[];
  public get plants(): IPlant[] {
    return this._plants;
  }
  public set plants(value: IPlant[]) {
    this._plants = value;
  }

  constructor(private backend: BackendService) { 
    this._plants = backend.getPlants()
    console.log(this._plants)
  }

  public addPlant(plant: IPlant)
  {
    this._plants.push(plant);
    this.ngOnInit()
  }

  ngOnInit(): void {
  }

  public dateSubtraction(plant1: IPlant, beginning: boolean): number
  {
    if(beginning)
    {
      return Math.floor((plant1.whenYields(plant1.sowingSeason.start).start.getTime() - plant1.sowingSeason.start.getTime())  /(1000 * 60 * 60 * 24));
    }
    else
      return Math.floor((plant1.whenYields(plant1.sowingSeason.start).end.getTime() - plant1.sowingSeason.start.getTime())  /(1000 * 60 * 60 * 24));    
  }

  public isPlant(iplant: IPlant): boolean{
    return iplant instanceof Plant
  }

  public dateWithoutYear(date: Date): string
  {
    let monthNames: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

    return monthNames[date.getMonth()] + " " + date.getDate();
  }
}
