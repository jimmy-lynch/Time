import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { CurrentWeekComponent } from './current-week/current-week.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageRefService } from './local-storage-ref.service';
import { UserService } from './user.service';
import { ActiveUserService } from './active-user.service';
import { CookieService } from 'ngx-cookie-service';
import { DaeService } from './dae.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { HomepageComponent } from './homepage/homepage.component';
import { addTimeModal } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CurrentWeekComponent,
    LoginComponent,
    HomepageComponent,
    addTimeModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatDialogModule
  ],
  providers: [CookieService, LocalStorageService, LocalStorageRefService, UserService, ActiveUserService, DaeService, DatePipe, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
