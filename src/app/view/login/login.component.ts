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
  registerForm: FormGroup
  first_name = ""
  last_name = ""
  phone = ""
  user_name = ""
  email = ""
  password = ""
  rol = ""
  errorMessage = ""
  userLoggedIn
  registeredUser
  register = false
  match = false

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

    this.registerForm = this.formBuilder.group({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      user_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      repeat_password: new FormControl("", [Validators.required]),
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

  validateCredentialsRegister(form: FormGroup) {
    if (form.value.password === form.value.repeat_password) {
      this.match = true
    } else {
      this.match = false
    }

    if (form.valid && this.match == true) {

      /* Aqui es donde llamo al servicio de registrar usuarios y le envio el form.value */
      this.loginService.registerUser(form.value).subscribe(
        p => {
          this.registeredUser = p.results !== undefined ? p.results : []
        },
        e => { console.log(e), this.launchMessage(e) },
        () => {
          this.launchMessage("Usuario o contraseña incorrecta")
        }
      )
      console.log("Datos enviados")
      console.log(form.value)
      this.register = false
      this.launchMessage("Registrado!!")

    } else {
      if (this.match == false) {
        this.launchMessage("Por favor verifica los datos, las contraseñas no son iguales.")
      } else {
        this.launchMessage("Por favor verifica los datos.")
      }
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
      case "first_name":
        errorMessage = this.registerForm.get("first_name").hasError("required")
          ? "Campo Nombre requerido"
          : ""
        break
      case "last_name":
        errorMessage = this.registerForm.get("last_name").hasError("required")
          ? "Campo Apellidos requerido"
          : ""
        break
      case "user_name":
        errorMessage = this.registerForm.get("user_name").hasError("required")
          ? "Campo UserName requerido"
          : ""
        break
      case "email":
        errorMessage = this.loginForm.get("email").hasError("required")
          ? "Campo email requerido"
          : this.loginForm.get("email").hasError("email")
            ? "Ingresa un correo válido"
            : ""
        break
      case "password":
        errorMessage = this.loginForm.get("password").hasError("required")
          ? "Campo Contraseña requerido"
          : ""
        break
    }
    return errorMessage
  }

}
