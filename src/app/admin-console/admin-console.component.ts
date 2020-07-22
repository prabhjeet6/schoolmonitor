import { Component, ViewChild } from '@angular/core';
import { AdminConsoleService } from 'src/app/service/admin-console.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Authorization': "Bearer " + localStorage.getItem('userToken') })
  , responseType: 'blob'
};
@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent {

  constructor(private adminConsoleService: AdminConsoleService) {

  }




  onUpload(data) {
    var formData = new FormData();
    formData.append('studentDataFile', data.files[0], data.files[0].name);
    this.adminConsoleService.onUpload(formData).subscribe();
  }





}
