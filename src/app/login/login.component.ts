import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BackendService]
})
export class LoginComponent implements OnInit {
  private email: string = ""
  private password: string = ""

  constructor(private auth: BackendService, private router: Router) { }

  ngOnInit(): void {
  }

  public get Email(): string
  {
    return this.email
  }
  public set Email(email: string)
  {
    this.email = email
  }
  public get Password(): string
  {
    return this.password
  }
  public set Password(password: string)
  {
    this.password = password
  }
  
  public onSubmit()
  {
    this.auth.loginUser({email: this.Email, password: this.Password}).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/account'])
      },
      err => {
        if(err instanceof HttpErrorResponse)
        {
          alert(err.error)
        }
        else
        {
          console.log(err)  
        }
      }
    )
  }
}
