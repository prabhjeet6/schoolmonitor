import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { History } from 'ngx-bootstrap/utils/facade/browser';
import { UtilsService } from 'src/app/utils/utils.service';
import { LoginCredentials } from 'src/app/login-credentials';
/**@author Prabhjeet Singh */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userNameWithDomain: string;
  password: string;
  loginStatus: boolean | undefined;
  userToken: object;
  loginCredentials: any;
  observableLoginRequest: Observable<object>;
  subscriptionObject: Subscription;

  constructor(public auth: AuthService, public utils: UtilsService, public router: Router) {

    this.loginCredentials = new LoginCredentials();
  }
  
  ngOnInit() {

  }

  login(): boolean {

    if (this.utils.setCredentials(this.userNameWithDomain, this.loginCredentials, this.password)) {
      this.observableLoginRequest = this.auth.login(this.loginCredentials);
      this.subscriptionObject = this.observableLoginRequest.subscribe(x => { this.userToken = x; this.loginStatus = true; this.userNameWithDomain = ''; this.password = ''; }, err => { this.loginStatus = false; this.userNameWithDomain = ''; this.password = ''; }, () => this.subscriptionObject.unsubscribe);

    } else {
      this.loginStatus = false;
      this.userNameWithDomain = '';
      this.password = '';
    }


    return this.loginStatus;
  }

  redirectToIntendedUrl(): void {

    localStorage.setItem('userToken', this.userToken['Token']);

    if (this.auth.redirectUrl == undefined)
      this.router.navigateByUrl(`/Dashboard`);
    else this.router.navigateByUrl(this.auth.redirectUrl);



  }
}
