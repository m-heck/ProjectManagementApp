import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component'
import { SignInPageComponent } from './sign-in-page/sign-in-page.component'
import { TeamSignInPageComponent } from './team-sign-in-page/team-sign-in-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-in', component: SignInPageComponent },
  {path: 'team-sign-in', component: TeamSignInPageComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const appRoutingModule = RouterModule.forRoot(routes);
