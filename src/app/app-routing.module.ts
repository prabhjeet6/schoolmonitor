import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';



import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { OnlineCourseworkComponent } from './online-coursework/online-coursework.component';

const routes: Routes = [
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'AdminConsole', component: AdminConsoleComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },
  { path: 'OnlineCoursework', component: OnlineCourseworkComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },

  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },
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
