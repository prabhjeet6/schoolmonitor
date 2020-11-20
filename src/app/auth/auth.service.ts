import { Injectable ,Inject} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginCredentials } from '../login-credentials';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http/src/params';
import {MessageService} from '../service/message.service';
import {BroadcastService} from './../service/broadcast.service';
import {BROADCAST_CHANNEL_INJECTION_TOKEN} from './../app.token';

declare var require: any;
const { BroadcastChannel } = require('broadcast-channel');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  private loginUrl = 'http://localhost:8088/auth/signin';
  requestBody: string;
  
  
  constructor(@Inject(BROADCAST_CHANNEL_INJECTION_TOKEN) private broadCastService: BroadcastService,private messageService:MessageService,public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  confirmLogin(url: string, router: Router): boolean {
    if (this.isAuthenticated()) {
     
      return true;
    }
  
   if(router.url!='/Login') 
    this.messageService.add("Sorry, Your Session has Expired! Please login again to Continue");
    
    this.redirectUrl = url;
    router.navigateByUrl('/Login');
    return false;
    
  }

  login(loginCredentials: LoginCredentials): Observable<object> {
    this.requestBody = JSON.stringify(loginCredentials);
    this.messageService.clear();
    return this.http.post<object>(this.loginUrl, this.requestBody, httpOptions);
    //.pipe( catchError(this.handleError<boolean>('Login', false)));
  }

  logOut() {

    this.broadCastService.publish({
      type: 'auth',
      payload: 'logOut'
    })
      localStorage.clear();
     
      
      this.router.navigateByUrl('/Login');
     
  }
}