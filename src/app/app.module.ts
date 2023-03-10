import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

// manual imports
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomePageComponent } from './home-page/home-page.component';
import { TeamSignInPageComponent } from './team-sign-in-page/team-sign-in-page.component';
import { PreLoginNavbarComponent } from './pre-login-navbar/pre-login-navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    HomePageComponent,
    TeamSignInPageComponent,
    PreLoginNavbarComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatProgressBarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
