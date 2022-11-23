import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  imports: [CommonModule],
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], 
  standalone: true
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
  public get User()
  {
    return;
  }
}
