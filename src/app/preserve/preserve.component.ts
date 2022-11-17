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
}
