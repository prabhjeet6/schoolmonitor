import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordService {
  private schoolDomainsUrl = 'http://localhost:8088/schoolmonitor/schoolDomains';
  constructor(private http: HttpClient) { }
  getSchoolDomains():Observable<string[]>{
    return this.http.get<string[]>(this.schoolDomainsUrl);
  }
}
