import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-define-plant',
  templateUrl: './define-plant.component.html',
  styleUrls: ['./define-plant.component.css']
})
export class DefinePlantComponent implements OnInit {
  private icon: string = ""
  private iconError: string = ""
  constructor() { }

  public get Icon(): string
  {
    return this.icon
  }
  public set Icon(val:string)
  {
    this.icon = val
  }

  public onLoad(event: Event)
  {
    this.iconError = ""
  }

  public onError(event: Event)
  {
    this.iconError = "OwO"
  }

  public get IconError(): string
  {
    return this.iconError
  }

  public onSubmit()
  {

  }

  ngOnInit(): void {
  }

}
