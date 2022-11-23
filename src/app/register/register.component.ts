import { HttpErrorResponse } from '@angular/common/http';
import { createInjectableType } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  private password: string = "";
  private email: string = "";
  private nickname: string = "";
  private router: Router;
  private auth: AuthService;
  constructor(router: Router, auth: AuthService) {
    this.router = router;
    this.auth = auth;
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
    let tmp: RegExpMatchArray | null = this.email.match(/^[a-zA-Z0-9\-_]+@[a-zA-Z0-9.\-_]+\.[a-z]{2,4}$/g); 
    if(tmp == undefined)
      return false;
    return tmp.length > 0;
  }
  public onSubmit()
  {
    let user: User = new User(this.email, this.nickname, this.password)
    this.auth.registerUser(user.toJSON()).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/account']);
      },
      err => {
        if(err instanceof HttpErrorResponse)
          alert(err.error)
        else
        {
          console.log(err)
        }
        this.ngOnInit()
    }
    )
  }
}
