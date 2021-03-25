import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Authorization':  localStorage.getItem('userToken'), 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OnlineCourseworkService {

  constructor(private http: HttpClient) { }
  private searchOnlineCourseworkUrl = 'http://localhost:8088/schoolmonitor/searchOnlineCoursework';
 search(searchTerm:String): Observable<any>{
return this.http.post<any>(this.searchOnlineCourseworkUrl,JSON.stringify(searchTerm),{
  headers:  new HttpHeaders({ 'Authorization':  localStorage.getItem('userToken') }),
  responseType: 'json' 
  
});

  }
}
