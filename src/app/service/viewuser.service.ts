import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class ViewuserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(buildGetUrl(GlobalVariable.READ_USERS), {
      headers: this.getHeadersNA(),
    })
  }

  private getHeadersNA() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new HttpHeaders()
    headers.set("Accept", "application/json")
    headers.set("Authorization", "Token")
    return headers
  }
}

function buildGetUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}
