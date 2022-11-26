import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './day/day.component';
import { PlantComponent } from './plant/plant.component';
import { MonthComponent } from './month/month.component';
import { PreserveComponent } from './preserve/preserve.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { BackendService } from './backend.service';
import { DefinePreserveComponent } from './define-preserve/define-preserve.component';
import { AuthGuard } from './auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { PlantsComponent } from './plants/plants.component';
import { DefinePlantComponent } from './define-plant/define-plant.component';
import { HighlightDirective } from './highlight.directive';
import { WeatherComponent } from './weather/weather.component';
import { FutureWeatherComponent } from './future-weather/future-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PlantComponent,
    MonthComponent,
    PreserveComponent,
    RegisterComponent,
    LoginComponent,
    DefinePreserveComponent,
    CalendarComponent,
    PlantsComponent,
    DefinePlantComponent,
    HighlightDirective,
    WeatherComponent,
    FutureWeatherComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    BrowserModule
  ],
  providers: [BackendService, AuthGuard, {provide: MAT_DATE_LOCALE, useValue: 'pl'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
