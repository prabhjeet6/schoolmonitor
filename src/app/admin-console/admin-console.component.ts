import { Component, ViewChild } from '@angular/core';
import { AdminConsoleService } from '../service/admin-console.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/*var httpOptions = {
  headers: new HttpHeaders({ 'Authorization':  localStorage.getItem('userToken'),'Accept':'multipart/form-data' })
  , responseType: 'blob'
};*/
@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent {

  constructor(private adminConsoleService: AdminConsoleService) {

  }

subscription:Subscription;
uploadStatus:boolean|undefined;

  onUpload(data,form) {
    var formData = new FormData();

     console.log("header value "+localStorage.getItem('userToken'))
     console.log(JSON.stringify(data.files[0])  +"data.files is here");
    
    formData.append('studentDataFile', data.files[0], data.files[0].name);
    
    console.log(JSON.stringify(data)  +"data is here" );
    
    if(null!=formData && null!=formData.entries()){
    this.subscription=this.adminConsoleService.onUpload(formData).subscribe(x => {/*this.uploadStatus = true;*/console.log(x);setTimeout(()=> { this.uploadStatus = true;},2000);  }, err => { console.log(err);this.uploadStatus = false; }, () => {this.subscription.unsubscribe});
    form.clear();  
    }
      
  }   
}  

