import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolRequestService } from "src/app/service/rolrequest.service";
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-rolrequest',
  templateUrl: './rolrequest.component.html',
  styleUrls: ['./rolrequest.component.scss']
})
export class RolrequestComponent implements OnInit {

  rolRequestForm: FormGroup
  ls: SecureLS
  rol: string
  errorMessage = ""
  requestToSend = {}
  rolRequest = {}

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private rolRequestService: RolRequestService
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.initForms()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method responsible for initializing the forms */
  initForms() {
    this.rolRequestForm = this.formBuilder.group({
      message: new FormControl("", [Validators.required]),
    })
  }

  validateCredentialsRolRequest(form: FormGroup) {
    if (form.valid) {
      this.requestToSend["new_role"] = 2
      this.requestToSend["message"] = form.value.message

      this.rolRequestService.sendRolRequest(this.requestToSend).subscribe(
        p => {
          console.log(p)
          this.rolRequest = p !== undefined ? p : []
        },
        e => {
          if(e.error.non_field_errors) {
            console.log(e.error)
            this.launchMessage("Ya enviaste una solicitud de cambio de rol, por favor espera 30 días para realizar una de nuevo")
          } else {
            console.log(e)
            this.launchMessage("Ocurrió un error, por favor intenta más tarde")
          }
        },
        () => {
          this.launchMessage("Solicitud enviada.")
          this.clearInputs(form)
        }
      )
    }
  }

  clearInputs(form) {
    form.reset()
  }

  /* Method in charge of alerting the errors of the form */
  getErrorMessage(component: string) {
    let errorMessage = ""
    switch (component) {
      case "message":
        errorMessage = this.rolRequestForm.get("message").hasError("required")
          ? "Por favor llene el campo"
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
