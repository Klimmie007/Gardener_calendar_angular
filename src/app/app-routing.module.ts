import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "account", component: AccountComponent},
  {path: "", redirectTo: "register", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule, CommonModule, BrowserModule]
})
export class AppRoutingModule { }
