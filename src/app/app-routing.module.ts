import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import {AuthGuardService as AuthGuard}  from './auth-guard.service';

import{TestComponent} from './test/test.component';
//import { LoginGuardService } from 'src/app/login-guard.service';

const routes: Routes = [
  {path:'Dashboard',component: DashboardComponent, canDeactivate: [AuthGuard]},
  {path:'Test',component: TestComponent,canActivate: [AuthGuard],canDeactivate: [AuthGuard]},
  {path:'',redirectTo:'/Login',pathMatch:'full'},
  {path:'Login',component:LoginComponent}
 // {path:'detail/:id', component:HeroDetailComponent},
  //The colon (:) in the path indicates that :id is a placeholder for a specific hero id.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
