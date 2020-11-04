import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AdminConsoleService {
  
  fileUploadUrl: string = 'http://localhost:8088/schoolmonitor/studentDataUpload';
  
  constructor(private http: HttpClient) { }
  
  onUpload( data:FormData):Observable<any> {
    return this.http.post(this.fileUploadUrl, data,{
      headers:  new HttpHeaders({ 'Authorization':  localStorage.getItem('userToken') }),
      responseType: 'json' 
      
    });
  }
}
