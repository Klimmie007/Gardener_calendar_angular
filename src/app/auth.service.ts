import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL: string = "http://localhost:3000/api/register"
  private _loginURL: string = "http://localhost:3000/api/login"
  constructor(private http: HttpClient) { }

  public registerUser(user: Object) : Observable<Object> {
    return this.http.post(this._registerURL, user)
  }
  public loginUser(user: Object) : Observable<Object> {
    return this.http.post(this._loginURL, user)
  }
}
