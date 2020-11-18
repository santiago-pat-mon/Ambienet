import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  /* Service that verifies that the credentials are correct */
  verifyUser(submission: any) {
    return this.http.post(buildPostUrl(GlobalVariable.LOGIN_USER), submission, {
      headers: this.getHeadersNA()
    })
  }

  /* Servicio que registra un usuario nuevo */
  registerUser(submission: any): Observable<any> {
    return this.http.post(buildPostUrl(GlobalVariable.REGISTER_USER), submission, {
      headers: this.getHeadersNA()
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

/* Construction of the get url */
function buildGetUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}

/* Construction of the post url */
function buildPostUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}
