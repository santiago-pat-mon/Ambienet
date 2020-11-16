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
  ls: SecureLS
  rol: string
  userDataSource
  errorMessage = ""
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
    "latitude",
    "longitude",
    "picture",
    "delete_user",
  ]

  user = [
    {
      username: "ajshda",
      first_name: "ajshda",
      last_name: "ajshda",
      email: "ajshda",
      phone_number: "1233321",
      profile: {
        biography: "kdjshfksd",
        country: "kdjshfksd",
        state: "kdjshfksd",
        city: "kdjshfksd",
        reputation: 5.0,
        latitude: 4.5631,
        longitude: -71.2323,
        picture: "url/hola.jpg",
      }
    },
  ]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    private viewUserService: ViewuserService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.getUserData()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  getUserData() {
    /* SE OBTIENE LA DATA DEL SERVICIO */

    this.viewUserService.getUsers().subscribe(
      p => {
        this.userDataSource = p.results !== undefined ? p.results : []
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        this.setObjectDataSource()
      })
  }

  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator
    console.log(this.userDataSource.paginator)
    console.log(this.paginator)
  }

  // set data on table
  setObjectDataSource() {
    this.userDataSource = new MatTableDataSource(this.user)
    this.ngAfterViewInit()
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

  applyObjectFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // MatTableDataSource defaults to lowercase matches
    this.userDataSource.filter = filterValue
  }

  deleteUser(user) {

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
