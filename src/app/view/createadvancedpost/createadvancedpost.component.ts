import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as SecureLS from 'secure-ls';
import { CreatepostService } from 'src/app/service/createpost.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-createadvancedpost',
  templateUrl: './createadvancedpost.component.html',
  styleUrls: ['./createadvancedpost.component.scss']
})
export class CreateadvancedpostComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  userName
  registerAdvancedPostData
  advancedPostForm: FormGroup
  advancedPostToSend = {
    advanced_report: {}
  }
  selectedDate = ""
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

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  conditionCtrl = new FormControl();
  conditions: string[] = [];

  selectable2 = true;
  removable2 = true;
  separatorKeysCodes2: number[] = [ENTER, COMMA];
  riskCtrl = new FormControl();
  risks: string[] = [];

  selectable3 = true;
  removable3 = true;
  separatorKeysCodes3: number[] = [ENTER, COMMA];
  personCtrl = new FormControl();
  people: string[] = [];

  selectable4 = true;
  removable4 = true;
  separatorKeysCodes4: number[] = [ENTER, COMMA];
  specieCtrl = new FormControl();
  species: string[] = [];

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

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
    this.userName = this.ls.get("isLoggedUserName")
  }

  /* Method responsible for initializing the forms */
  initForms() {
    this.advancedPostForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      climatic_phenomenon: new FormControl("", [Validators.required]),
      time_interval: new FormControl("", [Validators.required]),
      temp_max: new FormControl("", [Validators.required]),
      temp_min: new FormControl("", [Validators.required]),
    })
  }

  /* Method in charge of calling the "createpost" service to send the 
     required information when creating a new post */
  validateCredentialsPost(form: FormGroup) {
    if (form.valid) {
      if (this.auxPictureFile != true) {
        if (this.selectedFile.name != null) {
          if (this.conditions.length > 0) {
            if (this.risks.length > 0) {
              if (this.people.length > 0) {
                if (this.species.length > 0) {
                  this.uploadFile()

                  this.advancedPostToSend["title"] = form.value.title
                  this.advancedPostToSend["type_catastrophe"] = form.value.typeCatastrophe
                  this.advancedPostToSend["type_post"] = "REP"
                  this.advancedPostToSend["description"] = form.value.description
                  this.advancedPostToSend["latitude"] = this.myLatitude
                  this.advancedPostToSend["longitude"] = this.myLongitude
                  // this.advancedPostToSend["created"] = this.selectedDate
                  this.advancedPostToSend["photo"] = this.selectedFile.name
                  this.advancedPostToSend["user"] = this.userName
                  this.advancedPostToSend["type_report"] = "ADV"
                  this.advancedPostToSend.advanced_report["climatic_phenomenon"] = form.value.climatic_phenomenon
                  this.advancedPostToSend.advanced_report["time_interval"] = form.value.time_interval
                  this.advancedPostToSend.advanced_report["temp_max"] = form.value.temp_max
                  this.advancedPostToSend.advanced_report["temp_min"] = form.value.temp_min
                  this.advancedPostToSend.advanced_report["conditions_can_be_triggered"] = this.conditions.toString()
                  this.advancedPostToSend.advanced_report["associated_risks"] = this.risks.toString()
                  this.advancedPostToSend.advanced_report["affected_people"] = this.people.toString()
                  this.advancedPostToSend.advanced_report["affected_species"] = this.species.toString()
                  console.log(this.advancedPostToSend)

                  // Connection and sending of the advancedPostToSend to the server
                  this.createPostService.registerPost(this.advancedPostToSend).subscribe(
                    p => {
                      this.registerAdvancedPostData = p !== undefined ? p : []
                    },
                    e => { console.log(e), this.launchMessage("Ocurrió un error, por favor intenta más tarde") },
                    () => {
                      console.log("lo que envio")
                      console.log(this.advancedPostToSend)
                      console.log("lo que recibo")
                      console.log(this.registerAdvancedPostData)
                      this.clearData(form)
                      this.launchMessage("Post creado.")
                    }
                  )
                } else {
                  this.launchMessage("Por favor ingresa al menos una especie que podría afectar")
                }
              } else {
                this.launchMessage("Por favor ingresa al menos una poblacion que podría afectar")
              }
            } else {
              this.launchMessage("Por favor ingresa al menos un riesgo que podría desencadenar")
            }
          } else {
            this.launchMessage("Por favor ingresa al menos una afectación al medio ambiente")
          }
        } else {
          this.launchMessage("Por favor ingresa una imagen.")
        }
      } else {
        this.launchMessage("Por favor verifique que el formato de la imagen sea la correcta.")
      }
    } else {
      this.launchMessage("Por favor llene todos los campos requeridos del formulario.")
    }
  }

  /* Method in charge of cleaning the variables and the form */
  clearData(form) {
    /* this.selectedFile.name = null
    this.selectedFile.base64textString = null
    this.selectedFile.type = null */
    this.advancedPostToSend = {
      advanced_report: {}
    }
    this.conditions = []
    this.risks = []
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
      (e) => this.launchMessage("Ocurrió un error al subir la imagen, por favor intenta más tarde"),
      () => {
      }
    );
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

  /* Method that activates device location */
  selectDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getPosition(position), error => this.positionError(error))
      this.zoom = 16
    } else {
      this.launchMessage("Su navegador o dispositivo no soporta la API de geolocalización. Por favor selecciona tu ubicación manualmente.")
    }
  }

  /* Method in charge of directing users who have not registered and entered as guests */
  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  /* Method that selects the date the event occurs */
  getDate(event: any) {
    let date = new Date(event.target.value)
    let dateNow = new Date()
    console.log((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds())

    this.selectedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds()
  }

  /* Method in charge of alerting the errors of the form */
  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "title":
        errorMessage = this.advancedPostForm.get("title").hasError("required")
          ? "Campo Título requerido"
          : ""
        break
      case "description":
        errorMessage = this.advancedPostForm.get("description").hasError("required")
          ? "Campo Descripción requerido"
          : ""
        break
      case "climatic_phenomenon":
        errorMessage = this.advancedPostForm.get("climatic_phenomenon").hasError("required")
          ? "Campo Fenómeno Climático requerido"
          : ""
        break
      case "time_interval":
        errorMessage = this.advancedPostForm.get("time_interval").hasError("required")
          ? "Campo Intervalo de Tiempo requerido"
          : ""
        break
      case "temp_max":
        errorMessage = this.advancedPostForm.get("temp_max").hasError("required")
          ? "Campo Temperatura Máxima requerido"
          : ""
        break
      case "temp_min":
        errorMessage = this.advancedPostForm.get("temp_min").hasError("required")
          ? "Campo Temperatura Mínima requerido"
          : ""
        break
    }
    return errorMessage
  }

  /* Method that generates a unique id to store the files */
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

  /* ------------------ CONDITIONS ------------------- */
  addCondition(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.conditions.push(value);
    }

    // Clear the input value
    event.input.value = ''

    this.conditionCtrl.setValue(null);
  }

  removeCondition(condition: string): void {
    const index = this.conditions.indexOf(condition);

    if (index >= 0) {
      this.conditions.splice(index, 1);
    }
  }
  /* ---------------- END CONDITION ----------------- */

  /* ------------------ RISKS ------------------- */
  addRisk(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.risks.push(value);
    }

    // Clear the input value
    event.input.value = ''

    this.riskCtrl.setValue(null);
  }

  removeRisk(condition: string): void {
    const index = this.risks.indexOf(condition);

    if (index >= 0) {
      this.risks.splice(index, 1);
    }
  }
  /* ---------------- END RISKS ----------------- */

  /* ------------------ PEOPLE ------------------- */
  addPeople(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.people.push(value);
    }

    // Clear the input value
    event.input.value = ''

    this.personCtrl.setValue(null);
  }

  removePeople(person: string): void {
    const index = this.people.indexOf(person);

    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }
  /* ---------------- END PEOPLE ----------------- */

  /* ------------------ SPECIES ------------------- */
  addSpecie(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.species.push(value);
    }

    // Clear the input value
    event.input.value = ''

    this.specieCtrl.setValue(null);
  }

  removeSpecie(specie: string): void {
    const index = this.people.indexOf(specie);

    if (index >= 0) {
      this.species.splice(index, 1);
    }
  }
  /* ---------------- END PEOPLE ----------------- */

  /* Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 10000,
    })
  }

}
