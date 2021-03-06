import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { History } from 'ngx-bootstrap/utils/facade/browser';
import { UtilsService } from '../utils/utils.service';
import { LoginCredentials } from '../login-credentials';
import { Injectable } from '@angular/core';
import { AbstractControl,FormGroup, FormControl, Validators } from '@angular/forms';
import { String, StringBuilder } from 'typescript-string-operations';

/**@author Prabhjeet Singh */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {

  userNameWithDomain: string;
  password: string;
  loginStatus: boolean | undefined;
  userToken: object;
  loginCredentials: any;
  observableLoginRequest: Observable<object>;
  subscriptionObject: Subscription;
  loadingStatus:boolean;
  loginForm = new FormGroup({
    Username: new FormControl('', [
      Validators.required,this.usernameValidator
      ]),
    password: new FormControl('', [Validators.required])
  });
  constructor(public auth: AuthService, public utils: UtilsService, public router: Router) {
    this.loginCredentials = new LoginCredentials();
  
  }

  ngOnInit() {
    
    if(this.auth.isAuthenticated &&this.auth.redirectUrl==undefined ){
    this.router.navigateByUrl(`/Dashboard`);
  }
  }

  login(): boolean {
    
    if (this.utils.setCredentials(this.userNameWithDomain, this.loginCredentials, this.password)) {
      this.loadingStatus=true;
      this.observableLoginRequest = this.auth.login(this.loginCredentials);
      this.subscriptionObject = this.observableLoginRequest.subscribe(x => {setTimeout(()=> {this.loadingStatus=false;this.userToken = x; this.loginStatus = true; this.userNameWithDomain = ''; this.password = '';},2000); }, err => {this.loadingStatus=false; this.loginStatus = false; this.userNameWithDomain = ''; this.password = ''; }, () => this.subscriptionObject.unsubscribe);
    } else {
      this.loginStatus = false;
      this.userNameWithDomain = '';
      this.password = '';
    }
    return this.loginStatus;
  }

  redirectToIntendedUrl(): void {
    localStorage.setItem('userToken', this.userToken['Token']);
    if (this.auth.redirectUrl === undefined){
      this.router.navigateByUrl(`/Dashboard`);
    }
    else {
      this.router.navigateByUrl(this.auth.redirectUrl);
    }
  }
  
 

//Custom Validator Function
 usernameValidator (control: AbstractControl):{[key: string]: boolean} | null {
  if(control.value!=undefined&&null!=control.value){
  var  username=control.value as string;
  if( ( (username.indexOf("/") == -1&&username.indexOf("\\")==-1))){
  return {
    'usernameValidator': true
  }
  }
}
  return null;
  };
}