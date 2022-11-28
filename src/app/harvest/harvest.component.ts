import { Component, OnInit } from '@angular/core';
import { Harvest } from '../_models/harvest';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-preserve',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css'],
  providers: [BackendService],
})
export class HarvestComponent implements OnInit {
  harvestList: Harvest[] = new Array<Harvest>;
  loadComponent: boolean = false;
  private backend: BackendService;
  color = 'lightblue';

  constructor(auth: BackendService) {
    this.backend = auth;
   }

  ngOnInit(): void {
    this.getHarvests();
  }

  getHarvests() {
    this.harvestList =this.backend.getHarvest()
  }
}