import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Preserve } from '../_models/preserve';

@Component({
  selector: 'app-define-preserve',
  templateUrl: './define-preserve.component.html',
  styleUrls: ['./define-preserve.component.css']
})
export class DefinePreserveComponent implements OnInit {
  //name: string = '';
  //description: string = '';
  //dateOfProduction: Date = new Date();
  //expirationDate: Date = new Date();
  @Input() list: Preserve[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  definePreserve(formData: string[]) {
    //this.name = formData[0];
    //this.description = formData[1];
    let dateOfProduction = formData[4] + '-' + formData[3] + '-' + formData[2];
    //this.dateOfProduction = new Date(dateString);
    let expirationDate = formData[7] + '-' + formData[6] + '-' + formData[5];
    //this.expirationDate = new Date(dateString1);
    //preserves.push(new Preserve(this.name, this.description, dateString, dateString1));
    //this.list.push(new Preserve(this.name, this.description, dateString, dateString1));
    this.list.push(new Preserve(formData[0], formData[1], dateOfProduction, expirationDate));
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
