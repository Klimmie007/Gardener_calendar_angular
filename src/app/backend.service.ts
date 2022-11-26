import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
//import { Preserve } from '../app/_models/preserve';

interface token{
  token: string
}

interface User{
  email: string
  nickname: string
}

interface Preserve {
  name: string;
  description: string;
  dateOfProduction: Date;
  expirationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _registerURL: string = "http://localhost:3000/api/register"
  private _loginURL: string = "http://localhost:3000/api/login"
  private _userURL: string = "http://localhost:3000/api/user"
  private _preservesURL: string = "http://localhost:3000/api/preserves"
  private _emailURL: string = this._userURL + "/email"
  private _nicknameURL: string =  this._userURL + "/nickname"
  private _passwordURL: string = this._userURL + "/password"
  private _deleteURL: string = this._userURL + "/delete"
  private header: HttpHeaders = new HttpHeaders({token: localStorage.getItem('token') || ""})
  constructor(private http: HttpClient) { }

  public registerUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._registerURL, user)
  }
  public loginUser(user: Object) : Observable<token> {
    return this.http.post<token>(this._loginURL, user)
  }
  public getUser() : Observable<User>
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.post<User>(this._userURL, null, {headers: this.header})
  }

  public loggedIn(): boolean
  {
    //return this.http.post<verify>(this._tokenURL, null, {headers: new HttpHeaders({token: localStorage.getItem("token") || ""})})
    return !!localStorage.getItem('token')
  }
  public setEmail(email: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._emailURL, {email: email}, {headers: this.header})
  }
  public setNickname(nickname: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._nicknameURL, {nickname: nickname}, {headers: this.header})
  }
  public setPassword(password: string)
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.put(this._passwordURL, {password: password}, {headers: this.header})
  }
  public deleteAccount()
  {
    this.header.set('token', localStorage.getItem('token') || "")
    return this.http.delete(this._deleteURL, {headers: this.header})
  }

  // Preserve
  public addPreserve(preserve: Object): Observable<Object> {
    return this.http.post<Object>(this._preservesURL, preserve);
  }

  public getPreserves(): Observable<Array<Preserve>> {
    return this.http.get<Array<Preserve>>(this._preservesURL);
  }
}
