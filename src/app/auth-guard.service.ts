
import { Injectable } from '@angular/core';
import { Router, Route, CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { CanLoad } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) :Observable<boolean> | Promise<boolean> | boolean{
      let url: string = state.url;
      return this.checkLogin(url);
    
  }
checkLogin(url:string):boolean{
  if (this.auth.isAuthenticated()) {
    return true;
  }
  this.auth.redirectUrl=url;
  this.router.navigateByUrl('/Login');
  return false;
  
  
}
}