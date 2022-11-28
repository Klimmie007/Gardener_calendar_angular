import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { SowedPlant } from '../_models/sowedPlant';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css'],
  providers: [BackendService]
})
export class CropsComponent {
  private _sowedPlants: SowedPlant[] = [];
  public get sowedPlants(): SowedPlant[] {
    return this._sowedPlants;
  }
  public set sowedPlants(value: SowedPlant[]) {
    this._sowedPlants = value;
  }

  private _index: number = -1;
  public get index(): number {
    return this._index;
  }
  public set index(value: number) {
    this._index = value;
  }

  constructor(private backend: BackendService)
  {
    this._sowedPlants = backend.getSowedPlants()
  }

  public Click(idx: number)
  {
    this.index = idx;
  }
}
