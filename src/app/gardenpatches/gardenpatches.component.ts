import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { GardenPatch } from "../_models/gardenPatch";

@Component({
  selector: 'app-gardenpatches',
  templateUrl: './gardenpatches.component.html',
  styleUrls: ['./gardenpatches.component.css']
})
export class GardenpatchesComponent implements OnInit {
  private gardenPatchesList: GardenPatch[] = new Array<GardenPatch>;
  private auth: BackendService;

  constructor(auth: BackendService) {
    this.auth = auth;
  }

  ngOnInit(): void {
    this.getGardenPatches();
  }

  get GardenPatchesList(): GardenPatch[] {
    return this.gardenPatchesList;
  }

  getGardenPatches() {
    this.auth.getGardenPatches().subscribe(gardenPaches => {
      for(let i = 0; i < gardenPaches.length; ++i) {
        this.gardenPatchesList.push(new GardenPatch(gardenPaches[i].name, gardenPaches[i].type, gardenPaches[i].amount));
      }
    });
  }
}
