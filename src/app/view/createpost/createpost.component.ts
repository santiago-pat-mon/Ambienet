import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatepostService } from "src/app/service/createpost.service";
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  ls: SecureLS
  rol: string
  userName
  registerPostData
  postForm: FormGroup
  selectedDate = ""
  postToSend: Post
  myLatitude
  myLongitude
  zoom = 16
  errorMessage = ""
  auxPictureFile = false
  selectedFile = {
    name: null,
    base64textString: null,
    type: null
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    private createPostService: CreatepostService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.initForms()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getPosition(position), error => this.positionError(error))
    } else {
      this.launchMessage("Su navegador o dispositivo no soporta la API de geolocalización. Por favor selecciona tu ubicación manualmente.")
    }
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
    this.userName = this.ls.get("isLoggedUserName")
  }

  initForms() {
    this.postForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      typeCatastrophe: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    })
  }

  validateCredentialsPost(form: FormGroup) {
    if (form.valid && this.selectedDate != "") {
      if (this.auxPictureFile != true) {
        if (this.selectedFile.name != null) {
          this.uploadFile()

          this.postToSend.title = form.value.title
          this.postToSend.type_catastrophe = form.value.typeCatastrophe
          this.postToSend.description = form.value.description
          this.postToSend.latitude = this.myLatitude
          this.postToSend.longitude = this.myLongitude
          this.postToSend.created = this.selectedDate
          this.postToSend.photo = this.selectedFile.type + "/" + this.selectedFile.name
          this.postToSend.user = this.userName
          console.log(this.postToSend)
          this.launchMessage("Post creado con imagen.")

        } else {
          this.postToSend.title = form.value.title
          this.postToSend.type_catastrophe = form.value.typeCatastrophe
          this.postToSend.description = form.value.description
          this.postToSend.latitude = this.myLatitude
          this.postToSend.longitude = this.myLongitude
          this.postToSend.created = this.selectedDate
          this.postToSend.photo = ""
          this.postToSend.user = this.userName
          console.log(this.postToSend)
          this.launchMessage("Post creado sin imagen.")
        }

        /* Conexion y envio del postToSend al servidor */
        this.createPostService.registerPost(this.postToSend).subscribe(
          p => {
            this.registerPostData = p !== undefined ? p : []
          },
          e => { console.log(e), this.launchMessage(e) },
          () => {

            console.log(this.registerPostData)
            this.launchMessage("Post creado.")
            this.clearData(form)
          }
        )
      } else {
        this.launchMessage("Por favor verifique que el formato de la imagen sea la correcta.")
      }
    } else {
      this.launchMessage("Por favor llene todos los campos del formulario.")
    }
  }

  clearData(form) {
    this.selectedFile.name = null
    this.selectedFile.base64textString = null
    this.selectedFile.type = null
    form.reset()
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
        this.selectedFile.type = "postPicture";
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
    this.createPostService.uploadFile(this.selectedFile).subscribe(
      (p) => {
      },
      (e) => this.launchMessage(e),
      () => {
      }
    );
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


  /* The event in HTML would be mapClick but because this is a beta version it does not recognize the events, the API has an error
  https://github.com/SebastianM/angular-google-maps/issues/1845#issuecomment-672051511 */
  /* mapClicked($event: google.maps.MouseEvent) {
    this.myLatitude = $event.latLng.lat()
    this.myLongitude = $event.latLng.lng()
  } */

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

  selectDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getPosition(position), error => this.positionError(error))
      this.zoom = 16
    } else {
      this.launchMessage("Su navegador o dispositivo no soporta la API de geolocalización. Por favor selecciona tu ubicación manualmente.")
    }
  }

  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  getDate(event: any) {
    let date = new Date(event.target.value)
    let dateNow = new Date()
    console.log((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds())

    this.selectedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds()
  }

  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "title":
        errorMessage = this.postForm.get("title").hasError("required")
          ? "Campo Título requerido"
          : ""
        break
      case "description":
        errorMessage = this.postForm.get("description").hasError("required")
          ? "Campo Descripción requerido"
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
      duration: 10000,
    })
  }
}
