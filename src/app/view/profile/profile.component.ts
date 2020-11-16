import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from "src/app/service/profile.service";
import * as SecureLS from 'secure-ls';
import { Router } from '@angular/router';

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
  errorMessage = ""
  myLatitude
  myLongitude
  zoom = 16
  auxPictureFile = false
  userNameValue
  reputationValue
  userData = {
    username: "sdfs",
    first_name: "sdf",
    last_name: "sdfsdf",
    email: "sdfsd@hola.com",
    phone_number: "2313131231",
    profile: {
      biography: "sdf",
      country: "sdfsdf",
      state: "sdfs",
      city: "sdfsdf",
      reputation: 5.0,
      latitude: 4.5121535999999995,
      longitude: -75.65475839999999,
      picture: "url/image.jpg",
    }
  }
  profileToSend = {
    profile: {}
  }
  selectedFile = {
    name: null,
    base64textString: null,
    type: null
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.initForms()
    this.loadUserData()
  }

  initForms() {
    this.userForm = this.formBuilder.group({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone_number: new FormControl(""),
      biography: new FormControl(""),
      country: new FormControl(""),
      state: new FormControl(""),
      city: new FormControl(""),
    })
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  loadUserData() {

    /* ESTE SERIA EL METODO QUE LLAMA AL SERVICIO DE TRAER LOS DATOS DEL USUARIO */

    //this.userData = "Servicio que se conecta"

    this.reputationValue = this.userData.profile.reputation
    this.userNameValue = this.userData.username
    this.myLatitude = this.userData.profile.latitude
    this.myLongitude = this.userData.profile.longitude
    this.userForm.controls["first_name"].setValue(this.userData.first_name)
    this.userForm.controls["last_name"].setValue(this.userData.last_name)
    this.userForm.controls["email"].setValue(this.userData.email)
    this.userForm.controls["phone_number"].setValue(this.userData.phone_number)
    this.userForm.controls["biography"].setValue(this.userData.profile.biography)
    this.userForm.controls["country"].setValue(this.userData.profile.country)
    this.userForm.controls["state"].setValue(this.userData.profile.state)
    this.userForm.controls["city"].setValue(this.userData.profile.city)

  }

  validateCredentialsProfile(form: FormGroup) {
    if (form.valid) {
      if (this.auxPictureFile != true) {
        if (this.selectedFile.name != null) {
          this.uploadFile()

          /* aca se envian los datos al django el nombre de la imagen seria this.selectedFile.name pero como solo es URL
           seria var urlImage = this.selectedFile.type + "/" + this.selectedFile.name */

          this.profileToSend.profile["picture"] = this.selectedFile.type + "/" + this.selectedFile.name

          if (this.userData.first_name != form.value.first_name) {
            this.profileToSend["first_name"] = form.value.first_name
          }
          if (this.userData.last_name != form.value.last_name) {
            this.profileToSend["last_name"] = form.value.last_name
          }
          if (this.userData.phone_number != form.value.phone_number) {
            this.profileToSend["phone_number"] = form.value.phone_number
          }
          if (this.userData.email != form.value.email) {
            this.profileToSend["email"] = form.value.email
          }
          if (this.userData.profile.latitude != this.myLatitude) {
            this.profileToSend.profile["latitude"] = this.myLatitude
          }
          if (this.userData.profile.longitude != this.myLongitude) {
            this.profileToSend.profile["longitude"] = this.myLongitude
          }
          if (this.userData.profile.biography != form.value.biography) {
            this.profileToSend.profile["biography"] = form.value.biography
          }
          if (this.userData.profile.country != form.value.country) {
            this.profileToSend.profile["country"] = form.value.country
          }
          if (this.userData.profile.state != form.value.state) {
            this.profileToSend.profile["state"] = form.value.state
          }
          if (this.userData.profile.city != form.value.city) {
            this.profileToSend.profile["city"] = form.value.city
          }

          console.log("Con imagen ", this.profileToSend)

        } else {

          if (this.userData.first_name != form.value.first_name) {
            this.profileToSend["first_name"] = form.value.first_name
          }
          if (this.userData.last_name != form.value.last_name) {
            this.profileToSend["last_name"] = form.value.last_name
          }
          if (this.userData.phone_number != form.value.phone_number) {
            this.profileToSend["phone_number"] = form.value.phone_number
          }
          if (this.userData.email != form.value.email) {
            this.profileToSend["email"] = form.value.email
          }
          if (this.userData.profile.latitude != this.myLatitude) {
            this.profileToSend.profile["latitude"] = this.myLatitude
          }
          if (this.userData.profile.longitude != this.myLongitude) {
            this.profileToSend.profile["longitude"] = this.myLongitude
          }
          if (this.userData.profile.biography != form.value.biography) {
            this.profileToSend.profile["biography"] = form.value.biography
          }
          if (this.userData.profile.country != form.value.country) {
            this.profileToSend.profile["country"] = form.value.country
          }
          if (this.userData.profile.state != form.value.state) {
            this.profileToSend.profile["state"] = form.value.state
          }
          if (this.userData.profile.city != form.value.city) {
            this.profileToSend.profile["city"] = form.value.city
          }

          console.log("Sin imagen ", this.profileToSend)
        }


        /* ACA REALIZAMOS LA CONEXION CON DJANGO MEDIANTE EL SERVICIO PARA ENVIAR EL OBJETO JSON profileToSend  */


        this.launchMessage("Datos actualizados.")

      } else {
        this.launchMessage("Por favor verifique que el formato de la imagen sea la correcta.")
      }
    } else {
      this.launchMessage("Por favor llene todos los campos del formulario.")
    }
  }

  /* attached file */
  selectFile(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var name1 = file.name.split(".")
      var name = name1[name1.length - 1]
      if (name.toLowerCase() == "jpg" || name.toLowerCase() == "jpeg" || name.toLowerCase() == "png") {
        this.selectedFile.name = this.uuid() + "." + name.toLowerCase();
        this.selectedFile.type = "profilePicture";
        this.auxPictureFile = false
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      } else {
        this.launchMessage("La foto de perfil debe ser formato .jpg, .jpeg o .png")
        this.auxPictureFile = true
      }
    }
  }

  /* attached file */
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.selectedFile.base64textString = btoa(binaryString);
  }

  /* attached file */
  uploadFile() {
    this.profileService.uploadFile(this.selectedFile).subscribe(
      (p) => {
      },
      (e) => this.launchMessage(e),
      () => {
      }
    );
  }

  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  getPosition(position) {
    this.zoom = 16
    this.myLatitude = position.coords.latitude
    this.myLongitude = position.coords.longitude
    console.log("Latitud: ", this.myLatitude)
    console.log("Longitud: ", this.myLongitude)
  }

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

  uuid() {
    var uuidValue = "", k, randomValue;
    for (k = 0; k < 12; k++) {
      randomValue = Math.random() * 16 | 0;

      if (k == 8) {
        uuidValue += "-"
      }
      uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
  }

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 5000,
    })
  }

}
