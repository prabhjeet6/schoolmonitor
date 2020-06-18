import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; 
@Component({
  selector: 'lib-ngx-OneTimePassword',
  template: `
    <p>
      ngx-one-time-password works!
    </p>
  `,
  styles: []
})
export class NgxOneTimePasswordComponent implements OnInit {

  constructor() { }
  oneTimePasswordForm = new FormGroup({
    oneTimePassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
    Validators.minLength(4)])
    
  });
  ngOnInit() {
  }

}
