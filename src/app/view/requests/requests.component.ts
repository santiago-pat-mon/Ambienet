import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RequestModel } from 'src/app/model/request';
import * as SecureLS from 'secure-ls';
import { RolRequestService } from 'src/app/service/rolrequest.service';

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
  requestDataSource
  request
  displayedColumns = [
    "username",
    "name",
    "role",
    "email",
    "phone_number",
    "actions",
  ]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    public snackBar: MatSnackBar,
    private viewRequestService: RolRequestService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.getRequestData()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method in charge of obtaining the requests */
  getRequestData() {
    this.viewRequestService.getRolRequests().subscribe(
      p => {
        console.log(p)
        this.request = p.peding_role_requests !== undefined ? p.peding_role_requests : []
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        this.setObjectDataSource()
      }
    )
  }


  // set data on table
  setObjectDataSource() {
    this.requestDataSource = new MatTableDataSource(this.request)
    this.requestDataSource.paginator = this.paginator
    this.requestDataSource.filterPredicate = function (
      data: RequestModel,
      filterValue: string
    ) {
      return (
        // replace this with the column name you want to filter 
        data.requesting_user.username
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
        data.requesting_user.email
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0
      )
    }
  }

  // Method in charge of filtering the information in the table
  applyObjectFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // MatTableDataSource defaults to lowercase matches
    this.requestDataSource.filter = filterValue
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
