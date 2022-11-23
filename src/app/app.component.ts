import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BackendService]
})
export class AppComponent {
  title = 'JS_project';
  constructor(private auth: BackendService){}

  public LoggedIn(): boolean
  {
    return this.auth.loggedIn()
  }

  public Logout()
  {
    console.log("here")
    localStorage.removeItem('token');
    window.location.reload();
  }
}
