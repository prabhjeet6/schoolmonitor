import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { LoginCredentials } from 'src/app/login-credentials';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ResetPasswordService } from '../service/reset-password.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl,Validators  } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
/**@author Prabhjeet Singh */
export class ResetPasswordComponent implements OnInit {

  constructor(private utilsService: UtilsService, private _viewContainerRef: ViewContainerRef, private resetPasswordService: ResetPasswordService) { }
  domain: string;
  emailId: string;
  findAccountTemplatePortal: TemplatePortal<any>;
  otpTemplatePortal: TemplatePortal<any>;
  changePasswordTemplatePortal: TemplatePortal<any>;
  schoolList: string[];
  selectedPortal: Portal<any>;
  schoolDomainsRequest: Observable<string[]>;
  subscriptionObject: Subscription;
  
  accountRetrivalForm = new FormGroup({
   Email: new FormControl('',[
  	Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    Schoolname: new FormControl('',[Validators.required])
    });

  @ViewChild('findAccountTemplate') findAccountTemplate: TemplateRef<any>;
  @ViewChild('otpTemplate') otpTemplate: TemplateRef<any>;
  @ViewChild('changePasswordTemplate') changePasswordTemplate: TemplateRef<any>;
  ngOnInit() {

    this.findAccountTemplatePortal = new TemplatePortal(this.findAccountTemplate, this._viewContainerRef);
    this.otpTemplatePortal = new TemplatePortal(this.otpTemplate, this._viewContainerRef);
    this.changePasswordTemplatePortal = new TemplatePortal(this.changePasswordTemplate, this._viewContainerRef);
    this.selectedPortal = this.findAccountTemplatePortal;
    this.schoolDomainsRequest = this.resetPasswordService.getSchoolDomains();
    this.subscriptionObject = this.schoolDomainsRequest.subscribe(x => {  this.schoolList = x; }, err => { console.log(" Error on fetching schoolDomains " + err) }, () => this.subscriptionObject.unsubscribe);

  }

  get Email(){
    return this.accountRetrivalForm.get('Email')
    }

    get Schoolname(){
      return this.accountRetrivalForm.get('Schoolname')
      }

      getOTP(){
        
      }
}
