import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private static emailRegex: RegExp = new RegExp("^[a-zA-Z0-9\-_]+@[a-zA-Z0-9.\-_]+\.[a-z]{2,4}$");
  private password: string = "";
  private email: string = "";
  private nickname: string = "";
  constructor() { 
  }

  ngOnInit(): void {
  }
  @Input()
  public set Password(password: string)
  {
    this.password = password;
  }
  public get Password(): string
  {
    return this.password;
  }
  @Input()
  public set Email(email: string)
  {
    this.email = email;
  }
  public get Email()
  {
    return this.email;
  }
  @Input()
  public set Nickname(nickname: string)
  {
    this.nickname = nickname;
  }
  public get Nickname() : string
  {
    return this.nickname;
  }
  public get IsEmailValid() : boolean
  {
    let tmp: number | undefined = this.email.match(RegisterComponent.emailRegex)?.length;
    if(tmp == undefined)
      return false
    return tmp > 0;
  }
}
