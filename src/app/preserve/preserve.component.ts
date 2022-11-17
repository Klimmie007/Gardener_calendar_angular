import { Component, OnInit } from '@angular/core';
import { Preserve } from '../_models/preserve';

@Component({
  selector: 'app-preserve',
  templateUrl: './preserve.component.html',
  styleUrls: ['./preserve.component.css']
})
export class PreserveComponent implements OnInit {
  preserveList: Preserve[] = new Array;

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 15; ++i) {
      if(i == 0) {
        this.preserveList.push(new Preserve(`name${i}`, `desc${i}`, `2022-01-01`, `2022-09-01`));
      }
      else if(i < 10) {
        this.preserveList.push(new Preserve(`name${i}`, `desc${i}`, `2022-01-0${i}`, `2022-01-0${i}`));
      }
      else {
        this.preserveList.push(new Preserve(`name${i}`, `desc${i}`, `2022-01-0${i}`, `2022-01-${i}`));
      }
    }
  }
}
