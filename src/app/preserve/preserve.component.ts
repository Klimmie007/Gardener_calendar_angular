import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preserve',
  templateUrl: './preserve.component.html',
  styleUrls: ['./preserve.component.css']
})
export class PreserveComponent implements OnInit {
  name: string = '';
  description: string = '';
  dateOfProduction: Date = new Date();
  expirationDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.name = 'name';
    this.description = 'asda dsa fsg dgfjfdfsda fgj';
    this.dateOfProduction = new Date('2000-03-18');
    this.expirationDate = new Date('2020-03-18');
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
