import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { GlobalVariable } from "../config/global";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ls: SecureLS
  token
  userNameData

  constructor(private http: HttpClient) { }

  /* upload attached file */
  uploadFile(selectedFile) {
    let submission = JSON.stringify(selectedFile)
    return this.http.post(buildPOSTUrl(GlobalVariable.PROFILE_PICTURE_PHP), submission);
  }

  /* Update user */
  updateUser(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.userNameData = this.ls.get("isLoggedUserName")
    this.token = this.ls.get("isLoggedToken")
    return this.http.patch(buildPatchUrl(GlobalVariable.UPDATE_USER + this.userNameData + "/"), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Update profile */
  updateProfile(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.userNameData = this.ls.get("isLoggedUserName")
    this.token = this.ls.get("isLoggedToken")
    return this.http.patch(buildPatchUrl(GlobalVariable.UPDATE_USER + this.userNameData + "/profile/"), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Select user information */
  getUserData(): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.userNameData = this.ls.get("isLoggedUserName")
    this.token = this.ls.get("isLoggedToken")
    return this.http.get(buildGetUrl(GlobalVariable.READ_USERS + this.userNameData + "/"), {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  // I included these headers because otherwise FireFox
  // will request text/html instead of application/json
  private getHeadersNA() {
    const headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json')
    return headers
  }
}

/* Construction of the post url */
function buildPOSTUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_API_URL_PHP
  finalUrl += type
  return finalUrl
}

/* Construction of the patch url */
function buildPatchUrl(type: string): string {
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