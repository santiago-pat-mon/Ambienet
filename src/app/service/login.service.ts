import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  verifyUser(submission: any) {
    return this.http.post(buildPostUrl(GlobalVariable.LOGIN_USER), submission, {
      headers: this.getHeadersNA()
    })
  }

  registerUser(submission: any): Observable<any> {
    return this.http.post(buildPostUrl(GlobalVariable.REGISTER_USER), submission, {
      headers: this.getHeadersNA()
    })
  }

  private getHeadersNA() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new HttpHeaders()
    headers.set("Accept", "application/json")
    return headers
  }
}

function buildGetUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}

function buildPostUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}
