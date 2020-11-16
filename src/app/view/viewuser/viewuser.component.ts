import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user'
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
  ls: SecureLS
  rol: string
  userDataSource
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

  constructor() { }

  ngOnInit(): void {
    this.startVariables()
    this.getPostData()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  getPostData() {
    /* SE OBTIENE LA DATA DEL SERVICIO */

    this.setObjectDataSource()
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

}
