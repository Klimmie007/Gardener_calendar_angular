import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

interface token{
  token: string
}
interface verify{
  isVerified: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL: string = "http://localhost:3000/api/register"
  private _loginURL: string = "http://localhost:3000/api/login"
  private _tokenURL: string = "http://localhost:300/api/verify"
  private options: HttpHeaders = new HttpHeaders({token: localStorage.getItem('token') ? '?' : ''})
  constructor(private http: HttpClient) { }

  public registerUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._registerURL, user)
  }
  public loginUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._loginURL, user)
  }

  public loggedIn(): boolean
  {
    //return this.http.post<verify>(this._tokenURL, null, {headers: new HttpHeaders({token: localStorage.getItem("token") || ""})})
    return !!localStorage.getItem('token')
  }
}
