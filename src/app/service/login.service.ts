import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  verifyUser(submission: any) {
    if (submission.email == "admin@admin.com" && submission.password == "12345") {
      return true
    }
    return false
  }
}
