import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './day/day.component';
import { PlantComponent } from './plant/plant.component';
import { MonthComponent } from './month/month.component';
import { PreserveComponent } from './preserve/preserve.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { DefinePreserveComponent } from './define-preserve/define-preserve.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PlantComponent,
    MonthComponent,
    PreserveComponent,
    RegisterComponent,
    LoginComponent,
    DefinePreserveComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    BrowserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
