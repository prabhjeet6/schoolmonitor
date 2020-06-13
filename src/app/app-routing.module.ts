import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { TestComponent } from './test/test.component';


import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },
  { path: 'Test', component: TestComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent, canDeactivate: [AuthGuard] },
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/PageNotFound', pathMatch: 'full' }
  // {path:'detail/:id', component:HeroDetailComponent},
  //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

/**@author:PrabhjeetS */
export class AppRoutingModule { }
