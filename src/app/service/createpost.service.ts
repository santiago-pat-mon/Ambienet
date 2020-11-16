import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { GlobalVariable } from "../config/global";

@Injectable({
  providedIn: 'root'
})
export class CreatepostService {
  ls: SecureLS
  token

  constructor(private http: HttpClient) { }

  /* attached file */
  uploadFile(selectedFile) {
    let submission = JSON.stringify(selectedFile)
    return this.http.post(buildPOSTUrl(GlobalVariable.POST_PICTURE_PHP), submission);
  }

  registerPost(submission: any): Observable<any> {
    return this.http.post(buildPostUrl(GlobalVariable.REGISTER_POST), submission, {
      headers: this.getHeadersNA()
    })
  }

  private getHeadersNA() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new HttpHeaders()
    headers.set("Accept", "application/json")
    headers.set("Authorization", "Token " + this.token)
    return headers
  }
}

function buildPOSTUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_API_URL_PHP
  finalUrl += type
  return finalUrl
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
