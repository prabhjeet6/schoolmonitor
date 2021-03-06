import { Injectable } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';
/**@author Prabhjeet Singh */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  extractDomainAndUsername(userNameWithDomain: string): any {
    var domainAndUserName;

    if (userNameWithDomain.indexOf("/") != -1) {
      domainAndUserName = userNameWithDomain.split("/", 2);
    }
    else if (userNameWithDomain.indexOf('\\') != -1) {
      domainAndUserName = userNameWithDomain.split("\\", 2);
    }
    return domainAndUserName;
  }

  setCredentials(userNameWithDomain: string, loginCredentials: any, password: string): boolean {
    var domainAndUserName;
    if (!String.IsNullOrWhiteSpace(userNameWithDomain)) {
      domainAndUserName = this.extractDomainAndUsername(userNameWithDomain);
      if (domainAndUserName === undefined)
        return false;
      loginCredentials.domain = domainAndUserName[0] as string;
      loginCredentials.username = domainAndUserName[1] as string;
      loginCredentials.password = password;

      return true;
    }
    else return false;
  }

  


}
