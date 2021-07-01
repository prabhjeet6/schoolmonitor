import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PasswordRecoveryModel } from '../model/password-recovery-model';
import { ChangePasswordModel } from '../model/change-password-model';
import { Constants } from '../utils/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {
  
  OTPrequestBody:any;
  private schoolDomainsUrl = 'http://'+this.constants.host+'/schoolmonitor/schoolDomains';
  private otpGenerationUrl='http://'+this.constants.host+'/auth/OneTimePassword';
  private changePasswordUrl='http://'+this.constants.host+'/auth/changePassword';
  private captchaVerificationUrl='https://www.google.com/recaptcha/api/siteverify';
  constructor(private http: HttpClient,private constants:Constants) { }
  getSchoolDomains():Observable<string[]>{
    return this.http.get<string[]>(this.schoolDomainsUrl);
  }
  sendOTPRequest(passwordRecoveryModel: PasswordRecoveryModel):Observable<number>{
    
    this.OTPrequestBody = JSON.stringify(passwordRecoveryModel);
    return this.http.post<any>(this.otpGenerationUrl,this.OTPrequestBody
    ,httpOptions);
  }
  verifyCaptcha(){
     return this.http.post(this.captchaVerificationUrl,{secret:'6LdLXqYZAAAAAEx9nWB-Zvka_CsCiYojgRG9kz4M',response:'6LdLXqYZAAAAAIdhJpcS6yx3j2yJnELNitOqEGBo'},httpOptions)
  }


  changePassword(changePasswordModel:ChangePasswordModel):Observable<boolean>{
    return this.http.post<boolean>(this.changePasswordUrl,JSON.stringify(changePasswordModel),httpOptions);
    
  }
}
