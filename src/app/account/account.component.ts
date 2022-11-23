import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { BackendService } from '../backend.service';
import { User } from '../_models/user';

@Component({
  imports: [CommonModule],
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], 
  providers: [BackendService],
  standalone: true
})
export class AccountComponent implements OnInit {
  private user: User = new User("", "", "");
  private editEmail: boolean = false;
  private editNickname: boolean = false;
  private editPassword: boolean = false;
  constructor(private backend: BackendService, private router: Router) {
    this.backend.getUser().pipe(first()).subscribe(
      user => {
        this.user.Email = user.email
        this.user.Nickname = user.nickname
      },
      error =>
      {
        this.router.navigate(['/login'])
      }
    )
  }

  ngOnInit(): void {

  }
  public get User(): User
  {
    return this.user
  }
  public get EditEmail(): boolean
  {
    return this.editEmail;
  }
  public startEditEmail()
  {
    this.editEmail = true;
  }
  public get EditNickname(): boolean
  {
    return this.editNickname
  }
  public startEditNickname()
  {
    this.editNickname = true
  }
  public get EditPassword(): boolean
  {
    return this.editPassword
  }
  public startEditPassword()
  {
    this.editPassword = true;
  }
  public setEmail(email: string)
  {
    this.user.Email = email;
    this.editEmail = false;
    this.backend.setEmail(email).pipe(first()).subscribe(
      res => {
        console.log(res)
      },
      error => {
        if(error instanceof HttpErrorResponse)
        {
          alert(error.error)
          console.log(error)
        }
        else
        {
          console.log(error)
        }
      }
    )
  }
  public setNickname(nick: string)
  {
    this.user.Nickname = nick;
    this.editNickname = false;
    this.backend.setNickname(nick).pipe(first()).subscribe(
      res => console.log(res),
      error => {
        if(error instanceof HttpErrorResponse)
        {
          alert(error.error)
          console.log(error)
        }
        else
        {
          console.log(error)
        }
      }
    )
  }
  public setPassword(password: string)
  {
    this.editPassword = false;
    this.backend.setPassword(password).pipe(first()).subscribe(
      res => console.log(res),
      error => {
        if(error instanceof HttpErrorResponse)
        {
          alert(error.error)
          console.log(error)
        }
        else
        {
          console.log(error)
        }
      }
    )
  }
  public deleteAccount()
  {
    this.backend.deleteAccount().pipe(first()).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/'])
      },
      error => {
        if(error instanceof HttpErrorResponse)
        {
          console.log(error)
        }
        else
        {
          console.log(error)
        }
      }
    )
    this.router.navigate(['/'])
  }
}
