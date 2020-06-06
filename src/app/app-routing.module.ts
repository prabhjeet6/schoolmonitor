import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { TestComponent } from './test/test.component';
import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';
import { LogOutComponent } from 'src/app/log-out/log-out.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
 // { path: 'LogOut', component: LogOutComponent},
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard],canDeactivate: [AuthGuard] },
  { path: 'Test', component: TestComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent,canDeactivate: [AuthGuard]  },
  {path: '**', component: PageNotFoundComponent}
  // {path:'detail/:id', component:HeroDetailComponent},
  //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
