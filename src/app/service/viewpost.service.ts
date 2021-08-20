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

  /* Select posts from the database */
  getPosts(): Observable<any> {
    return this.http.get(buildGetUrl(GlobalVariable.READ_POSTS), {
      headers: this.getHeadersNA(),
    })
  }

  /* Delete post from the database */
  deletePost(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.delete(buildDeleteUrl(GlobalVariable.DELETE_POST, submission.id), {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Service that sends the information of a user who validated a post */
  sendValidatorData(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.post(buildPostUrl(GlobalVariable.SEND_VALIDATOR_POST), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Service that adds one when the validate button is pressed */
  addValidator(submission: any, id: string): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.patch(buildPatchUrl(GlobalVariable.INCREASE_POST_VALIDATION, id), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
    })
  }

  /* Service used to report a post */
  sendReportData(submission: any): Observable<any> {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.token = this.ls.get("isLoggedToken")
    return this.http.post(buildPostUrl(GlobalVariable.REPORT_POST + submission + "/report_post/"), submission, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + this.token),
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

/* Construction of the delete url */
function buildDeleteUrl(type: string, id: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  finalUrl += id + "/"
  return finalUrl
}

/* Construction of the patch url */
function buildPatchUrl(type: string, id: string): string {
  let finalUrl = GlobalVariable.BASE_SERVER_URL
  finalUrl += type
  finalUrl += id + "/"
  return finalUrl
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