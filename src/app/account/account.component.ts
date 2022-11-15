import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Backend } from '../backend';
import { User } from '../_models/user';

@Component({
  imports: [CommonModule],
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], 
  providers: [Backend],
  standalone: true
})
export class AccountComponent implements OnInit {
  private backend: Backend;

  constructor(backend: Backend) {this.backend = backend}

  ngOnInit(): void {
  }
  public get Users(): User[]
  {
    return this.backend.Users;
  }
}
