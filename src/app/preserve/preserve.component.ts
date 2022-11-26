import { Component, OnInit } from '@angular/core';
import { Preserve } from '../_models/preserve';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-preserve',
  templateUrl: './preserve.component.html',
  styleUrls: ['./preserve.component.css'],
  providers: [BackendService],
})
export class PreserveComponent implements OnInit {
  private preserveList: Preserve[] = new Array<Preserve>;
  private loadComponent: boolean = false;
  private auth: BackendService;
  private color = 'lightblue';

  constructor(auth: BackendService) {
    this.auth = auth;
   }

  ngOnInit(): void {
    this.getPreserves();
  }

  get PreserveList(): Array<Preserve> {
    return this.preserveList;
  }

  get LoadComponent(): boolean {
    return this.loadComponent;
  }

  get Color(): string {
    return this.color;
  }

  getPreserves() {
    this.auth.getPreserves().subscribe(preserves => {
      //this.preserveList = preserves;
      for(let i = 0; i < preserves.length; ++i) {
        this.preserveList.push(new Preserve(preserves[i].name, preserves[i].description, preserves[i].dateOfProduction, preserves[i].expirationDate));
      }
    });
  }

  loadDefinePreserveComponent() {
    if(this.loadComponent) {
      this.loadComponent = false;
    }
    else {
      this.loadComponent = true;
    }
  }
}
