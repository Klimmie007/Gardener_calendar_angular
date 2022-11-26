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
  preserveList: Preserve[] = new Array<Preserve>;
  loadComponent: boolean = false;
  private auth: BackendService;
  color = 'lightblue';

  constructor(auth: BackendService) {
    this.auth = auth;
   }

  ngOnInit(): void {
    this.getPreserves();
  }

  getPreserves() {
    this.auth.getPreserves().subscribe(preserves => {
      this.preserveList = preserves;
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
