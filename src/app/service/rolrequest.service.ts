import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class RolRequestService {
  ls: SecureLS
  token
  userNameData

  constructor(private http: HttpClient) { }

  /* Send change rol user */
  sendRolRequest(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.post(buildPostUrl(GlobalVariable.ROLREQUEST_SEND), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token)
    })
  }

  /* Select posts from the database */
  getRolRequests(): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.get(buildGetUrl(GlobalVariable.READ_ROL_REQUEST), {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }
}

/* Construction of the post url */
function buildPostUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}

/* Construction of the get url */
function buildGetUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}
