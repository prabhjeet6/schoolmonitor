import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { LoginCredentials } from 'src/app/login-credentials';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ResetPasswordService } from '../service/reset-password.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { AbstractControl,ReactiveFormsModule,FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordRecoveryModel } from 'src/app/model/password-recovery-model';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
/**@author Prabhjeet Singh */
export class ResetPasswordComponent implements OnInit {

  constructor(public passwordRecoveryModel: PasswordRecoveryModel, private utilsService: UtilsService, private _viewContainerRef: ViewContainerRef, private resetPasswordService: ResetPasswordService) { }
  validForm:boolean|undefined;
  oneTimePassword:number;
  findAccountTemplatePortal: TemplatePortal<any>;
  otpTemplatePortal: TemplatePortal<any>;
  changePasswordTemplatePortal: TemplatePortal<any>;
  schoolList: string[];
  selectedPortal: Portal<any>;
  schoolDomainsRequest: Observable<string[]>;
  subscriptionObject: Subscription;
  captchaResponse: boolean|undefined;
  @ViewChild('ngOTPInput') ngOtpInput:any;
  
  accountRetrivalForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    Schoolname: new FormControl('', [Validators.required]),
    
  });
  requestOTP: Observable<number>;
  otp:string;

  @ViewChild('findAccountTemplate') findAccountTemplate: TemplateRef<any>;
  @ViewChild('otpTemplate') otpTemplate: TemplateRef<any>;
  @ViewChild('changePasswordTemplate') changePasswordTemplate: TemplateRef<any>;
  ngOnInit() {

    this.findAccountTemplatePortal = new TemplatePortal(this.findAccountTemplate, this._viewContainerRef);
    this.otpTemplatePortal = new TemplatePortal(this.otpTemplate, this._viewContainerRef);
    this.changePasswordTemplatePortal = new TemplatePortal(this.changePasswordTemplate, this._viewContainerRef);
    this.selectedPortal = this.findAccountTemplatePortal;
    this.schoolDomainsRequest = this.resetPasswordService.getSchoolDomains();
    this.subscriptionObject = this.schoolDomainsRequest.subscribe(x => { this.schoolList = x; }, err => { console.log(" Error on fetching schoolDomains " + err) }, () => this.subscriptionObject.unsubscribe);

  }

  get Email() {
    return this.accountRetrivalForm.get('Email')
  }

  get Schoolname() {
    return this.accountRetrivalForm.get('Schoolname')
  }

  getOneTimePassword(): boolean {
    if (this.accountRetrivalForm.invalid|| this.captchaResponse != true ) {
      this.validForm=false;
      return false;
    }
    else {
      this.validForm=true;
      this.selectedPortal = this.otpTemplatePortal;
      this.passwordRecoveryModel.schoolname = this.Schoolname.value as string;
      this.passwordRecoveryModel.emailId = this.Email.value as string;
      this.requestOTP = this.resetPasswordService.sendOTPRequest(this.passwordRecoveryModel);
      this.subscriptionObject = this.requestOTP.subscribe(x => { this.oneTimePassword = x;  }, err => { console.log(" Error on fetching oneTimePassword " + err) }, () => this.subscriptionObject.unsubscribe);

      return true;
    }
  }

  showResponse(event) {
    this.captchaResponse = true;
     //call to a backend to verify against recaptcha with private key and return boolean accordingly
    //TODO:not working;
    //this.resetPasswordService.verifyCaptcha().subscribe(x => { console.log('response from google Captcha: ' + x['success']) }, err => {  console.log('err from google Captcha: ' + err)  }, () => this.subscriptionObject.unsubscribe);
  }
  Back() {
    if (this.selectedPortal === this.otpTemplatePortal) {
      this.selectedPortal = this.findAccountTemplatePortal;
      this.captchaResponse = false;
      this.accountRetrivalForm.reset();
    }
    else if (this.selectedPortal === this.changePasswordTemplatePortal) {
      this.selectedPortal = this.otpTemplatePortal;
    }
  }
  verifyOneTimePassword(){
    
   //if(this.otp==this.oneTimePassword){
   console.log(this.otp);
     this.selectedPortal=this.changePasswordTemplatePortal;
  // }
  }
}

