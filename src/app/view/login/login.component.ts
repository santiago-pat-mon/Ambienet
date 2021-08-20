import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { LoginService } from 'src/app/service/login.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  /* Declaration of variables */
  loginForm: FormGroup
  registerForm: FormGroup
  first_name = ""
  last_name = ""
  phone_number = ""
  username = ""
  email = ""
  password = ""
  rol = ""
  myLatitude
  myLongitude
  zoom = 16
  userToSend = {}
  errorMessage = ""
  userLoggedIn
  registeredUser
  register = false
  match = false

  /* Component constructor */
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) { }

  ngOnInit(): void {
    this.initForms()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getPosition(position), error => this.positionError(error))
    } else {
      this.launchMessage("Su navegador o dispositivo no soporta la API de geolocalización. Por favor selecciona tu ubicación manualmente.")
    }
  }

  /* Method responsible for initializing the forms */
  initForms() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })

    this.registerForm = this.formBuilder.group({
      first_name: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{2,254}")]),
      last_name: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]{2,254}")]),
      phone_number: new FormControl(""),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      repeat_password: new FormControl("", [Validators.required]),
    })
  }

  loguinTest() {
    this.router.navigate(["dashboard"])
    var ls = new SecureLS({ encodingType: "aes" })
    ls.set("isLoggedIn", "true")
    ls.set("isLoggedRol", "admin")
    ls.set("isLoggedToken", "123")
    ls.set("isLoggedFirstName", "test")
    ls.set("isLoggedLastName", "test2")
    ls.set("isLoggedUserName", "TEST")
  }

  /* Method in charge of validating the login credentials */
  validateCredentialsLogin(form: FormGroup) {
    if (form.valid) {

      //CaptchaV3
      this.recaptchaV3Service.execute('importantAction')
        .subscribe(
          (token) => {
            //See captcha
            console.log("Token Captcha (Login): " + token);

            // commet this
            //this.loguinTest()

            this.loginService.verifyUser(form.value).subscribe(
              p => {
                console.log("login")
                console.log(p)
                this.userLoggedIn = p !== undefined ? p : []
              },
              e => {
                console.log(e)
                if (e.error != "") {
                  this.launchMessage("Credenciales inválidas")
                }
              },
              () => {
                if (this.userLoggedIn.user.is_staff == true) {
                  this.router.navigate(["dashboard"])
                  var ls = new SecureLS({ encodingType: "aes" })
                  ls.set("isLoggedIn", "true")
                  ls.set("isLoggedRol", "admin")
                  ls.set("isLoggedToken", this.userLoggedIn.token)
                  ls.set("isLoggedUserName", this.userLoggedIn.user.username)
                } else {
                  if (this.userLoggedIn.user.is_staff == false) {
                    this.router.navigate(["dashboard"])
                    var ls = new SecureLS({ encodingType: "aes" })
                    ls.set("isLoggedIn", "true")
                    ls.set("isLoggedRol", "user")
                    ls.set("isLoggedToken", this.userLoggedIn.token)
                    ls.set("isLoggedFirstName", this.userLoggedIn.user.first_name)
                    ls.set("isLoggedLastName", this.userLoggedIn.user.last_name)
                    ls.set("isLoggedUserName", this.userLoggedIn.user.username)
                    ls.set("isLoggedRolUser", this.userLoggedIn.user.role)
                  } else {
                    this.launchMessage("Usuario o contraseña incorrecta")
                  }
                }
              }
            )
          },
          (error) => {
            //Captcha error
            console.log("Error (Login): " + error);
          });
    } else {
      this.launchMessage("Por favor verifica los datos")
    }
  }

  /* Method in charge of validating that the registration is carried out correctly */
  validateCredentialsRegister(form: FormGroup) {
    if (form.value.password === form.value.repeat_password) {
      this.match = true
    } else {
      this.match = false
    }

    if (form.valid && this.match == true) {

      this.userToSend["username"] = form.value.username
      this.userToSend["first_name"] = form.value.first_name
      this.userToSend["last_name"] = form.value.last_name
      this.userToSend["phone_number"] = form.value.phone_number
      this.userToSend["email"] = form.value.email
      this.userToSend["password"] = form.value.password
      this.userToSend["latitude"] = this.myLatitude
      this.userToSend["longitude"] = this.myLongitude

      console.log(this.userToSend)

      this.recaptchaV3Service.execute('importantAction')
        .subscribe(
          (token) => {
            //See captcha
            console.log("Token Captcha (Register): " + token);

            this.loginService.registerUser(this.userToSend).subscribe(
              p => {
                this.registeredUser = p !== undefined ? p : []
                console.log(this.registeredUser)
              },
              e => {
                console.log(e), this.launchMessage(e)
                let aux = false
                if (e.error.email != undefined) {
                  this.launchMessage("Este Correo ya se encuentra en uso, por favor digite otro.")
                  aux = true
                }
                if (e.error.username != undefined) {
                  if (e.error.username[0] == "This field must be unique.") {
                    this.launchMessage("El Nombre de usuario ya se encuentra en uso, por favor digite otro.")
                    aux = true
                  }
                }
                if (e.error.phone_number != undefined) {
                  this.launchMessage("Por favor verifique el número de teléfono.")
                  aux = true
                }
                if (e.error.non_field_errors != undefined) {
                  this.launchMessage("La contraseña es muy debil.")
                  aux = true
                }
                if (aux == false && e.error) {
                  this.launchMessage("Verifique que: El campo nombre y apellidos tenga mas de 3 caracteres, el nombre de usuario tenga mas de 6 caracteres o que la contraseña tenga mínimo 4 caracteres.")
                  aux = false
                }
              },
              () => {
                console.log("Por fuera:", this.registeredUser)
                this.register = false
                this.launchMessage("Registrado!!")
              }
            )
          },
          (error) => {
            //Captcha error
            console.log("Error (Register): " + error);
          });
    } else {
      if (this.match == false) {
        this.launchMessage("Por favor verifica los datos, las contraseñas no son iguales.")
      } else {
        this.launchMessage("Por favor verifica los datos.")
      }
    }
  }

  /* Responsible method to perform a session for the guest user */
  enterGuest() {
    this.router.navigate(["dashboard"])
    var ls = new SecureLS({ encodingType: "aes" })
    ls.set("isLoggedIn", "true")
    ls.set("isLoggedRol", "guest")
  }

  /* Method responsible for obtaining the user's location */
  getPosition(position) {
    this.zoom = 16
    this.myLatitude = position.coords.latitude
    this.myLongitude = position.coords.longitude
    console.log("Latitud: ", this.myLatitude)
    console.log("Longitud: ", this.myLongitude)
  }

  /* Method in charge of alerting the user about possible problems 
     with obtaining the location */
  positionError(error) {
    console.log(error)
    switch (error.code) {
      case 1:
        this.launchMessage("Geolocalización denegada por el usuario. Por favor activa la geolocalización o escoge tu ubicación manualmente.")
        break
      case 2:
        this.launchMessage("No se ha podido acceder a la información de su posición. Por favor escoge tu ubicación manualmente.")
        break
      case 3:
        this.launchMessage("El servicio ha tardado demasiado tiempo en responder. Inténtalo de nuevo o escoge tu ubicación manualmente.")
        break
      default:
        this.launchMessage("Error desconocido en Google Maps.")
    }

    this.myLatitude = 4.5349888296673075
    this.myLongitude = -75.67577780594667
    this.zoom = 10
  }

  /* Method that activates device location */
  selectDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getPosition(position), error => this.positionError(error))
      this.zoom = 16
    } else {
      this.launchMessage("Su navegador o dispositivo no soporta la API de geolocalización. Por favor selecciona tu ubicación manualmente.")
    }
  }

  /* Small solution to the error raised above */
  public mapReadyHandler(map: google.maps.Map): void {
    map.addListener('click', (e: google.maps.MouseEvent) => {
      // Here we can get correct event
      this.myLatitude = e.latLng.lat()
      this.myLongitude = e.latLng.lng()
      console.log("Latitud: ", this.myLatitude)
      console.log("Longitud: ", this.myLongitude)
    });
  }

  /* Method in charge of alerting the errors of the form */
  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "first_name":
        errorMessage = this.registerForm.get("first_name").hasError("required")
          ? "Campo Nombre requerido"
          : this.registerForm.get("first_name").hasError("pattern")
            ? "Solo ingresar letras no números"
            : ""
        break
      case "last_name":
        errorMessage = this.registerForm.get("last_name").hasError("required")
          ? "Campo Apellidos requerido"
          : this.registerForm.get("last_name").hasError("pattern")
            ? "Solo ingresar letras no números"
            : ""
        break

      case "email":
        errorMessage = this.registerForm.get("email").hasError("required")
          ? "Campo email requerido"
          : this.registerForm.get("email").hasError("email")
            ? "Ingresa un correo válido"
            : ""
        break
      case "username":
        errorMessage = this.loginForm.get("username").hasError("required")
          ? "Campo Nombre de usuario requerido"
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

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"

    this.snackBar.open(message, action, {
      duration: 10000
    })
  }
}
