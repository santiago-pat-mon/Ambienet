import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  email = ""
  password = ""
  rol = ""
  errorMessage = ""
  userLoggedIn

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForms()
  }

  initForms() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      rol: new FormControl("", [Validators.required])
    })
  }

  validateCredentialsLogin(form: FormGroup) {

    if (form.valid) {
      /* this.loginService.verifyUser(form.value).subscribe(
        p => {
          this.userLoggedIn = p.results !== undefined ? p.results : []
        },
        e => { console.log(e), this.launchMessage(e) },
        () => {
          if (this.userLoggedIn.length > 0) {
            this.router.navigate(["dashboard"])
            var ls = new SecureLS({ encodingType: "aes" })
            ls.set("isLoggedIn", "true")
          } else {
            this.launchMessage("Usuario o contraseña incorrecta")
          }
        }
      ) */
      this.userLoggedIn = this.loginService.verifyUser(form.value)

      if (this.userLoggedIn == "admin") {
        this.router.navigate(["dashboard"])
        var ls = new SecureLS({ encodingType: "aes" })
        ls.set("isLoggedIn", "true")
        ls.set("isLoggedRol", "admin")
      } else {
        if (this.userLoggedIn == "user") {
          this.router.navigate(["dashboard"])
          var ls = new SecureLS({ encodingType: "aes" })
          ls.set("isLoggedIn", "true")
          ls.set("isLoggedRol", "user")
        } else {
          this.launchMessage("Usuario o contraseña incorrecta")
        }
      }
    } else {
      this.launchMessage("Por favor verifica los datos")
    }
  }

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"

    this.snackBar.open(message, action, {
      duration: 5000
    })
  }

  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "email":
        errorMessage = this.loginForm.get("email").hasError("required")
          ? "Campo email requerido"
          : this.loginForm.get("email").hasError("email")
            ? "Ingresa un correo válido"
            : ""
        break
      case "password":
        errorMessage = this.loginForm.get("password").hasError("required")
          ? "Campo password requerido"
          : ""
        break
    }
    return errorMessage
  }

}
