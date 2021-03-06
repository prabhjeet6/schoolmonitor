import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { LoginCredentials } from '../login-credentials';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ResetPasswordService } from '../service/reset-password.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { AbstractControl,ReactiveFormsModule,FormGroup, FormControl, Validators, ValidationErrors  } from '@angular/forms';
import { PasswordRecoveryModel } from '../model/password-recovery-model';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../model/change-password-model';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
/**@author Prabhjeet Singh */
export class ResetPasswordComponent implements OnInit {

  constructor(public changePasswordModel:ChangePasswordModel,public router:Router,public passwordRecoveryModel: PasswordRecoveryModel, private utilsService: UtilsService, private _viewContainerRef: ViewContainerRef, private resetPasswordService: ResetPasswordService) { }
  validForm:boolean|undefined;
  enteredOneTimePassword:any;
  recievedOneTimePassword:any;
  findAccountTemplatePortal: TemplatePortal<any>;
  otpTemplatePortal: TemplatePortal<any>;
  changePasswordTemplatePortal: TemplatePortal<any>;
  schoolList: string[];
  selectedPortal: Portal<any>;
  schoolDomainsRequest: Observable<string[]>;
  subscriptionObject: Subscription;
  changePasswordSubscription:Subscription;
  captchaResponse: boolean|undefined;
  changePasswordRequest:Observable<boolean>;
  passwordChanged:boolean;
  @ViewChild('ngOTPInput') ngOtpInput:any;
  
  accountRetrivalForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    Schoolname: new FormControl('', [Validators.required]),
  } 
);
//cross validation to form
matchPasswordsValidator:ValidatorFn=(control: FormGroup): ValidationErrors  | null =>{
  let newPassword= control.get('newPassword').value;
 
  let confirmNewPassword = control.get('confirmNewPassword').value;
  
  if (newPassword != confirmNewPassword) {
    return {'matchPasswordsValidator': true}
  }
  else {
    return null;
  }
};

  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
        
      ])
    ,confirmNewPassword: new FormControl('', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])
    
  }
  ,this.matchPasswordsValidator
);

  requestOTP: Observable<number>;
  otp:string;
  otpVerified:boolean;
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
  get NewPassword(){
    return this.changePasswordForm.get('newPassword');
  }
  get ConfirmNewPassword(){
    return this.changePasswordForm.get('confirmNewPassword');
  }
  onOtpChange(enteredOneTimePassword) {
    this.enteredOneTimePassword = enteredOneTimePassword;
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
      this.subscriptionObject = this.requestOTP.subscribe(x => { this.recievedOneTimePassword = x;  }, err => { console.log(" Error on fetching oneTimePassword " + err) }, () => this.subscriptionObject.unsubscribe);

      return true;
    }
  }

  showResponse(event) {
    
     //call to a backend to verify against recaptcha with private key and return boolean accordingly
    
  this.resetPasswordService.verifyCaptcha().subscribe(x => { console.log('response from google Captcha: ' + x['success']) }, err => {  console.log('err from google Captcha: ' + err)  }, () => this.subscriptionObject.unsubscribe);
  this.captchaResponse = true;
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
    
   if(this.enteredOneTimePassword==this.recievedOneTimePassword){
   
     this.selectedPortal=this.changePasswordTemplatePortal;
     this.otpVerified=true;
   }
   else this.otpVerified=false;
  }
  changePassword(){
    this.changePasswordModel.emailId=this.Email.value;
    this.changePasswordModel.domain=this.Schoolname.value;
    this.changePasswordModel.newPassword=this.changePasswordForm.get('newPassword').value
    this.changePasswordRequest=this.resetPasswordService.changePassword(this.changePasswordModel);
    this.changePasswordSubscription=this.changePasswordRequest.subscribe(x=>{this.passwordChanged=x; console.log(x);},err=>{console.log(err);this.passwordChanged=false;},()=>{this.changePasswordSubscription.unsubscribe})
    //this.router.navigateByUrl('/Login');
    
  }
}