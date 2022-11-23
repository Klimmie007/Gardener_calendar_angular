import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { DefinePreserveComponent } from './define-preserve/define-preserve.component';
import { LoginComponent } from './login/login.component';
import { PreserveComponent } from './preserve/preserve.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "preserve", component: PreserveComponent, canActivate: [AuthGuard]},
  {path: "define-preserve", component: DefinePreserveComponent},
  {path: "", redirectTo: "register", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule, CommonModule, BrowserModule]
})
export class AppRoutingModule { }
