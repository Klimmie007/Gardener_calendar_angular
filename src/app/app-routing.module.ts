import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { CropsComponent } from './crops/crops.component';
import { DefineGardenpatchComponent } from './define-gardenpatch/define-gardenpatch.component';
import { DefinePlantComponent } from './define-plant/define-plant.component';
import { DefinePreserveComponent } from './define-preserve/define-preserve.component';
import { GardenpatchesComponent } from './gardenpatches/gardenpatches.component';
import { HarvestComponent } from './harvest/harvest.component';
import { LoginComponent } from './login/login.component';
import { PlantsComponent } from './plants/plants.component';
import { PreserveComponent } from './preserve/preserve.component';
import { RegisterComponent } from './register/register.component';
import { SowComponent } from './sow/sow.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "account", component: AccountComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "preserve", component: PreserveComponent, canActivate: [AuthGuard]},
  //{path: "define-preserve", component: DefinePreserveComponent},
  {path: "calendar", component: CalendarComponent}, 
  {path: "gardenpatches", component: GardenpatchesComponent},
  {path: "plant", component: PlantsComponent},
  {path: "crops", component: CropsComponent},
  {path: "harvest", component: HarvestComponent},
  {path: "", redirectTo: "register", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule, CommonModule, BrowserModule]
})
export class AppRoutingModule { }
