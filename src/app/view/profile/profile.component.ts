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
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.email]),
      user_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  validateCredentialsLogin(form: FormGroup) {
  }

  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "first_name":
        errorMessage = this.userForm.get("first_name").hasError("required")
          ? "Campo Nombre requerido"
          : ""
        break
      case "last_name":
        errorMessage = this.userForm.get("last_name").hasError("required")
          ? "Campo Apellidos requerido"
          : ""
        break
      case "user_name":
        errorMessage = this.userForm.get("user_name").hasError("required")
          ? "Campo UserName requerido"
          : ""
        break
      case "email":
        errorMessage = this.userForm.get("email").hasError("required")
          ? "Campo email requerido"
          : this.userForm.get("email").hasError("email")
            ? "Ingresa un correo válido"
            : ""
        break
      case "password":
        errorMessage = this.userForm.get("password").hasError("required")
          ? "Campo Contraseña requerido"
          : ""
        break
    }
    return errorMessage
  }

}
