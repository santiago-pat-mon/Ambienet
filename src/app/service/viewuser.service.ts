import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class ViewuserService {
  ls: SecureLS
  token

  constructor(private http: HttpClient) { }

  /* Select posts from the database */
  getUsers(): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.get(buildGetUrl(GlobalVariable.READ_USERS), {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Block user from the database */
  blockUser(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.post(buildPostUrl(GlobalVariable.BLOCK_USER), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token)
    })
  }

  // I included these headers because otherwise FireFox
  // will request text/html instead of application/json
  private getHeadersNA() {
    const headers = new HttpHeaders()
    headers.set("Accept", "application/json")
    return headers
  }
}

/* Construction of the user url */
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
