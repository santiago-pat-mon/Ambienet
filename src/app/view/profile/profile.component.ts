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
  auxPictureFile = false
  profileToSend = {
    first_name: "",
    last_name: "",
    phone: "",
    user_name: "",
    email: "",
    password: "",
    profileImage: ""
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
  }

  initForms() {
    this.userForm = this.formBuilder.group({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      user_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  validateCredentialsProfile(form: FormGroup) {
    if (form.valid) {
      if (this.auxPictureFile != true) {
        if (this.selectedFile.name != null) {
          this.uploadFile()

          /* aca se envian los datos al django el nombre de la imagen seria this.selectedFile.name pero como solo es URL
           seria var urlImage = this.selectedFile.type + "/" + this.selectedFile.name */

          this.profileToSend.first_name = form.value.first_name
          this.profileToSend.last_name = form.value.last_name
          this.profileToSend.phone = form.value.phone
          this.profileToSend.user_name = form.value.user_name
          this.profileToSend.email = form.value.email
          this.profileToSend.password = form.value.password
          this.profileToSend.profileImage = this.selectedFile.type + "/" + this.selectedFile.name
          console.log("Con imagen ", this.profileToSend)
        } else {
          this.profileToSend.first_name = form.value.first_name
          this.profileToSend.last_name = form.value.last_name
          this.profileToSend.phone = form.value.phone
          this.profileToSend.user_name = form.value.user_name
          this.profileToSend.email = form.value.email
          this.profileToSend.password = form.value.password
          this.profileToSend.profileImage = ""
          console.log("Sin imagen ", this.profileToSend)
        }
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
        this.selectedFile.name = file.name;
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

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 5000,
    })
  }

}
