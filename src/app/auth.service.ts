import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL: string = "http://localhost:3000/api/register"
  constructor(private http: HttpClient) { }

  public registerUser(user: Object) : Observable<Object> {
    console.log(user)
    console.log(this.http)
    return this.http.post(this._registerURL, user)
  }
}
