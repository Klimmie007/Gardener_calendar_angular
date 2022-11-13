import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayComponent } from './day/day.component';
import { PlantComponent } from './plant/plant.component';
import { MonthComponent } from './month/month.component';
import { PreserveComponent } from './preserve/preserve.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    PlantComponent,
    MonthComponent,
    PreserveComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
