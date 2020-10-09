import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup
  ls: SecureLS
  rol: string
  name = ""
  last_name = ""
  gender = ""
  email = ""
  password = ""

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.initForms()
  }

  initForms() {
    this.userForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required])
    })
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  validateCredentialsLogin(form: FormGroup) {
  }

}
