import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
      productionDay: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      productionMonth: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      productionYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      expirationDay: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      expirationMonth: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      expirationYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });
  }

  ngOnInit(): void {

  }

  definePreserve(formModel: FormGroup) {
    if(formModel.valid) {
      let name = '' + formModel.controls['name'].value;
      let desc = '' + formModel.controls['description'].value;
      let dateOfProduction = formModel.controls['productionDay'].value + '-' + formModel.controls['productionMonth'].value + '-' + formModel.controls['productionYear'].value;
      let expirationDate = formModel.controls['expirationDay'].value + '-' + formModel.controls['expirationMonth'].value + '-' + formModel.controls['expirationYear'].value;

      this.list.push(new Preserve(name, desc, dateOfProduction, expirationDate));
    }
  }

  resetForm(formModel: FormGroup) {
    formModel.reset();
  }
}
