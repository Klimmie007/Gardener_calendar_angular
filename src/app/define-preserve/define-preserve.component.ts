import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Preserve } from '../_models/preserve';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-define-preserve',
  templateUrl: './define-preserve.component.html',
  styleUrls: ['./define-preserve.component.css'],
  providers: [BackendService],
})
export class DefinePreserveComponent implements OnInit {
  @Input() list: Preserve[] = [];
  formModel: FormGroup;
  private auth: BackendService;

  constructor(auth: BackendService) {
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

    this.auth = auth;
  }

  ngOnInit(): void {

  }

  definePreserve(formModel: FormGroup) {
    if(formModel.valid) {
      let name = '' + formModel.controls['name'].value;
      let desc = '' + formModel.controls['description'].value;
      let dateOfProduction = formModel.controls['productionYear'].value + '-' + formModel.controls['productionMonth'].value + '-' + formModel.controls['productionDay'].value;
      let expirationDate = formModel.controls['expirationYear'].value + '-' + formModel.controls['expirationMonth'].value + '-' + formModel.controls['expirationDay'].value;

      let preserve: Preserve = new Preserve(name, desc, dateOfProduction, expirationDate);

      this.auth.addPreserve(preserve).subscribe(res => {
        console.log(res);
      }, err => {
        if(err instanceof HttpErrorResponse) {
          alert(err.error);
        }
        else {
          console.log(err);
        }
      });
      this.list.push(preserve);
    }
  }

  resetForm(formModel: FormGroup) {
    formModel.reset();
  }
}
