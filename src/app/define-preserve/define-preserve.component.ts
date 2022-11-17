import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  definePreserve(formData: string[]) {
    this.name = formData[0];
    this.description = formData[1];
    let dateString = '';
    dateString = formData[4] + '-' + formData[3] + '-' + formData[2];
    this.dateOfProduction = new Date(dateString);
    dateString = formData[7] + '-' + formData[6] + '-' + formData[5];
    this.expirationDate = new Date(dateString);
  }
}
