import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AdminConsoleService {
  
  fileUploadUrl: string = 'http://localhost:8088/schoolmonitor/studentDataUpload';
  
  constructor(private http: HttpClient) { }
  /** Accept header is a way for a client to specify the media type of the
   *  response content it is expecting and Content-type is a way to specify
   *  the media type of request being sent from the client to the server.
   *  
   *  Here, Content type is multipart/file as we are sending file to the server,
   *  and response type is json as we get json in response from server which 
   * itself consumes multipart request. 
   * 
   * Here, Content type is automatically set by the browser, setting 
   * it manually will cause an error stating there is no multipart boundary.
   * 
   * Also, Post verb here needs to infer the responseType, to get the result
   * expected from the query, hence, options object in the POST verb is inlined.
   * if we, instead, pass options object reference, verb will not be able to 
   * comprehend the return type to expect.  
   * 
   * */
  onUpload( data:FormData):Observable<any> {
    return this.http.post(this.fileUploadUrl, data,{
      headers:  new HttpHeaders({ 'Authorization':  localStorage.getItem('userToken') }),
      responseType: 'json' 
      
    });
  }
}
