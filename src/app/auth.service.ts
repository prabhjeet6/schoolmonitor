import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router/src/router';
import {LocationStrategy} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
redirectUrl:string;
  constructor(public jwtHelper: JwtHelperService,private locationStrategy: LocationStrategy) {}
 
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    
    return !this.jwtHelper.isTokenExpired(token);
  }

  confirmLogin(url:string,router :Router):boolean{
    if (this.isAuthenticated() ){
      return true;
      
    }
    this.redirectUrl=url;
    router.navigateByUrl('/Login');
    return false;
    
    
  }

  

}
