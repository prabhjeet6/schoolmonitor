import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { LoginCredentials } from 'src/app/login-credentials';
import { String, StringBuilder } from 'typescript-string-operations';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
   
   userNameWithDomain: string;
   password: string;
   loginStatus: boolean | undefined;
   loginCredentials: any;
   observableLoginRequest: Observable<boolean>;
   subscriptionObject: Subscription;
   
  constructor(public loginService: LoginService) { 
   
   this.loginCredentials=new LoginCredentials();
  }

  ngOnInit() {

  }
  setCredentials(userNameWithDomain: string): boolean {
    var domainAndUserName;
    if (!String.IsNullOrWhiteSpace(userNameWithDomain)) {
      if (userNameWithDomain.indexOf("/") != -1) {
        domainAndUserName = userNameWithDomain.split("/", 2);
      }
      else if (userNameWithDomain.indexOf('\\') != -1) {
        domainAndUserName = userNameWithDomain.split("\\", 2);
      }
      else return false;
      this.loginCredentials.domain =domainAndUserName[0] as string;
      this.loginCredentials.username =domainAndUserName[1] as string;
      this.loginCredentials.password=this.password;
     
      return true;
    }
    else return false;


  }
  Login(): boolean {
    
    if (this.setCredentials(this.userNameWithDomain)) {
    this.observableLoginRequest= this.loginService.Login(this.loginCredentials);
        this.subscriptionObject=this.observableLoginRequest.subscribe(x=>{this.loginStatus=true; this.userNameWithDomain='';this.password='';},err=>{this.loginStatus=false;this.userNameWithDomain='';this.password='';},()=>this.subscriptionObject.unsubscribe);
    
    
    
    }
    //else this.loginStatus=false;
    return this.loginStatus;
  }
}
