import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ChangePasswordModel {
    emailId:string;
    domain:string;
    newPassword:string;

}
