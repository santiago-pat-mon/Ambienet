import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { ViewuserService } from 'src/app/service/viewuser.service';
import * as SecureLS from 'secure-ls';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})

export class ViewuserComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  userDataSource
  errorMessage = ""
  user
  displayedColumns = [
    "username",
    "name",
    "email",
    "phone_number",
    "biography",
    "country",
    "state",
    "city",
    "reputation",
    "picture",
    "delete_user",
  ]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  /* Component constructor */
  constructor(
    private viewUserService: ViewuserService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.getUserData()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method in charge of obtaining the users */
  getUserData() {
    this.viewUserService.getUsers().subscribe(
      p => {
        console.log(p)
        this.user = p.results !== undefined ? p.results : []
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        this.setObjectDataSource()
      }
    )
  }

  // set data on table
  setObjectDataSource() {
    this.userDataSource = new MatTableDataSource(this.user)
    this.userDataSource.paginator = this.paginator
    this.userDataSource.filterPredicate = function (
      data: User,
      filterValue: string
    ) {
      return (
        /** replace this with the column name you want to filter */
        data.username
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
        data.email
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0
      )
    }
  }

  /* Method in charge of filtering the information in the table */
  applyObjectFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // MatTableDataSource defaults to lowercase matches
    this.userDataSource.filter = filterValue
  }

  blockUser(user) {
    this.viewUserService.blockUser(user).subscribe(
      p => {
        console.log("AQUI")
        console.log(p)
      },
      e => {
        if (e.error) {
          this.launchMessage("El usuario ya está bloqueado actualmente.")
        }
      },
      () => {
        this.getUserData()
        this.launchMessage("Usuario bloqueado")
      }
    )
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
