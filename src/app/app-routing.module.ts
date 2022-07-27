import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LiveTrackerComponent } from './live-tracker/live-tracker.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { CurrentWeekComponent } from './current-week/current-week.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'timesheets', component: TimesheetsComponent},
  {path: 'current-week', component: CurrentWeekComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomepageComponent, LiveTrackerComponent, NavbarComponent, TimeTableComponent, TimesheetsComponent, CurrentWeekComponent, LoginComponent];
