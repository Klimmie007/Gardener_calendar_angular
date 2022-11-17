import { Component, OnInit, Input } from '@angular/core';
import { Preserve } from '../_models/preserve';

@Component({
  selector: 'app-define-preserve',
  templateUrl: './define-preserve.component.html',
  styleUrls: ['./define-preserve.component.css']
})
export class DefinePreserveComponent implements OnInit {
  name: string = '';
  description: string = '';
  dateOfProduction: Date = new Date();
  expirationDate: Date = new Date();

  constructor() {
  }

  ngOnInit(): void {
  }

  definePreserve(formData: string[]) {
    this.name = formData[0];
    this.description = formData[1];
    let dateString = '';
    dateString = formData[4] + '-' + formData[3] + '-' + formData[2];
    this.dateOfProduction = new Date(dateString);
    let dateString1 = formData[7] + '-' + formData[6] + '-' + formData[5];
    this.expirationDate = new Date(dateString1);
  }
}
