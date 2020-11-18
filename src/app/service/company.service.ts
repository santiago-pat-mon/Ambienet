import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from "../config/global";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  /* upload attached file */
  uploadFile(selectedFile) {
    let submission = JSON.stringify(selectedFile)
    return this.http.post(buildPOSTUrl(GlobalVariable.POST_PICTURE_PHP), submission);
  }
}

/* Construction of the post url */
function buildPOSTUrl(type: string): string {
  let finalUrl = GlobalVariable.BASE_API_URL_PHP
  finalUrl += type
  return finalUrl
}
