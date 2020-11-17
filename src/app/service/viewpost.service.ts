import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class ViewpostService {
  ls: SecureLS
  token

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(buildGetUrl(GlobalVariable.READ_POSTS), {
      headers: this.getHeadersNA(),
    })
  }

  deletePost(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.delete(buildDeleteUrl(GlobalVariable.DELETE_POST, submission.id), {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
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

function buildDeleteUrl(type: string, id: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  finalUrl += id + "/"
  return finalUrl
}

function buildGetUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  return finalUrl
}