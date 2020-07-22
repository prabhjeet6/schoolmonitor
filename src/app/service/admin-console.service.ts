import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
const httpOptions = {
  headers: new HttpHeaders({  'Authorization': localStorage.getItem('userToken') })
  ,reportProgress: true,
   
};
@Injectable({
  providedIn: 'root'
})
export class AdminConsoleService {
  fileUploadUrl: string = 'http://localhost:8088/schoolmonitor/studentDataUpload';
  
  
  constructor(private http: HttpClient) { }
  
  onUpload( data:FormData):Observable<any> {
    
    return this.http.post<any>(this.fileUploadUrl, data, httpOptions);
      
  }
}
