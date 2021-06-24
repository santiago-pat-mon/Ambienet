import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  postDataSource
  errorMessage = ""

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.startVariables()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
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
