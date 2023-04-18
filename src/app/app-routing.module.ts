import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component'
import { SignInPageComponent } from './sign-in-page/sign-in-page.component'
import { TeamSignInPageComponent } from './team-sign-in-page/team-sign-in-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TimelinePageComponent } from './timeline-page/timeline-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-up', component: SignInPageComponent },
  { path: 'login', component: TeamSignInPageComponent},
  { path: 'main', component: MainPageComponent },
  { path: 'timeline', component: TimelinePageComponent },

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const appRoutingModule = RouterModule.forRoot(routes);
