import { HomePageComponent } from './home-page/home-page.component'
import { SignInPageComponent } from './sign-in-page/sign-in-page.component'

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-in', component: SignInPageComponent },
  //{path: 'register', component: RegisterComponent}

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const appRoutingModule = RouterModule.forRoot(routes);
