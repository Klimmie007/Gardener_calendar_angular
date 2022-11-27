import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlantType } from "../_models/plantInterface";
import { GardenPatch } from "../_models/gardenPatch";
import { BackendService } from '../backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-define-gardenpatch',
  templateUrl: './define-gardenpatch.component.html',
  styleUrls: ['./define-gardenpatch.component.css']
})
export class DefineGardenpatchComponent implements OnInit{
  private formModel: FormGroup = new FormGroup({});
  private types: string[] = [];
  private auth: BackendService;

  constructor(auth: BackendService) {
    this.types = [PlantType.Plant, PlantType.Bush, PlantType.Tree];
    this.auth = auth;
  }

  ngOnInit() {
    this.formModel = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      amount: new FormControl('')
    });
  }

  get FormModel(): FormGroup {
    return this.formModel;
  }

  get Types(): string[] {
    return this.types;
  }

  defineGardenPatch(formModel: FormGroup) {
    if(formModel.valid) {
      let name = formModel.controls['name'].value;
      let type = formModel.controls['type'].value;
      let amount = formModel.controls['amount'].value;

      let gardenPatch: GardenPatch = new GardenPatch(name, type, amount);

      this.auth.addGardenPatch(gardenPatch.toJson()).subscribe(res => {
        console.log(res);
      }, err => {
        if(err instanceof HttpErrorResponse) {
          alert(err.error);
        }
        else {
          console.log(err);
        }
      });
    }
  }

  resetForm(formModel: FormGroup) {
    formModel.reset();
  }
}
