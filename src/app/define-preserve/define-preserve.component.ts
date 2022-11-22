import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Preserve } from '../_models/preserve';

@Component({
  selector: 'app-define-preserve',
  templateUrl: './define-preserve.component.html',
  styleUrls: ['./define-preserve.component.css']
})
export class DefinePreserveComponent implements OnInit {
  @Input() list: Preserve[] = [];
  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      productionDay: new FormControl(''),
      productionMonth: new FormControl(''),
      productionYear: new FormControl(''),
      expirationDay: new FormControl(''),
      expirationMonth: new FormControl(''),
      expirationYear: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  definePreserve(formModel: FormGroup) {
    let name = '' + formModel.controls['name'].value;
    let desc = '' + formModel.controls['description'].value;
    let dateOfProduction = formModel.controls['productionDay'].value + '-' + formModel.controls['productionMonth'].value + '-' + formModel.controls['productionYear'].value;
    let expirationDate = formModel.controls['expirationDay'].value + '-' + formModel.controls['expirationMonth'].value + '-' + formModel.controls['expirationYear'].value;

    this.list.push(new Preserve(name, desc, dateOfProduction, expirationDate));
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
