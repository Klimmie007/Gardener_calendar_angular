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
  private formModel: FormGroup;
  private auth: BackendService;

  constructor(auth: BackendService) {
    this.formModel = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
      productionDay: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("(0[1-9]|[12][0-9]|3[01]|[1-9])")]),
      productionMonth: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("(0[1-9]|1[012]|[1-9])")]),
      productionYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("(199[0-9]|20[0-9][0-9])")]),
      expirationDay: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("(0[1-9]|[12][0-9]|3[01]|[1-9])")]),
      expirationMonth: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern("(0[1-9]|1[012]|[1-9])")]),
      expirationYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("(199[0-9]|20[0-9][0-9])")])
    });

    this.auth = auth;
  }

  get FormModel(): FormGroup {
    return this.formModel;
  }

  get name() {
    return this.formModel.get('name');
  }

  get description() {
    return this.formModel.get('description');
  }

  get productionDay() {
    return this.formModel.get('productionDay');
  }

  get productionMonth() {
    return this.formModel.get('productionMonth');
  }

  get productionYear() {
    return this.formModel.get('productionYear');
  }

  get expirationDay() {
    return this.formModel.get('expirationDay');
  }

  get expirationMonth() {
    return this.formModel.get('expirationMonth');
  }

  get expirationYear() {
    return this.formModel.get('expirationYear');
  }

  ngOnInit(): void {

  }

  definePreserve(formModel: FormGroup) {
    if(formModel.valid) {
      console.log("dziala");
      let name = '' + formModel.controls['name'].value;
      let desc = '' + formModel.controls['description'].value;
      let dateOfProduction = formModel.controls['productionYear'].value + '-' + formModel.controls['productionMonth'].value + '-' + formModel.controls['productionDay'].value;
      let expirationDate = formModel.controls['expirationYear'].value + '-' + formModel.controls['expirationMonth'].value + '-' + formModel.controls['expirationDay'].value;

      let preserve: Preserve = new Preserve(name, desc, new Date(dateOfProduction), new Date(expirationDate));

      this.auth.addPreserve(preserve.toJSON()).subscribe(res => {
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
