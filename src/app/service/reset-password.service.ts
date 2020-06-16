import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PasswordRecoveryModel } from 'src/app/model/password-recovery-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {
  OTPrequestBody:any;
  private schoolDomainsUrl = 'http://localhost:8088/schoolmonitor/schoolDomains';
  private otpGenerationUrl='http://localhost:8088/auth/OneTimePassword';
  constructor(private http: HttpClient) { }
  getSchoolDomains():Observable<string[]>{
    return this.http.get<string[]>(this.schoolDomainsUrl);
  }
  sendOTPRequest(passwordRecoveryModel: PasswordRecoveryModel):Observable<number>{
    
    this.OTPrequestBody = JSON.stringify(passwordRecoveryModel);
    return this.http.post<any>(this.otpGenerationUrl,this.OTPrequestBody
    ,httpOptions);
  }
}
