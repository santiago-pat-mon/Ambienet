import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RequestModel } from 'src/app/model/request';
import * as SecureLS from 'secure-ls';
import { RolRequestService } from 'src/app/service/rolrequest.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewobjectDialogComponent } from '../viewobject-dialog/viewobject-dialog.component';

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
  acceptResponseData
  rejectResponseData
  requestDataSource
  request
  displayedColumns = [
    "username",
    "name",
    "status",
    "email",
    "phone_number",
    "actions",
  ]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    public dialog: MatDialog,
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

  /* Method responsible for displaying the message */
  viewMessage(user) {
    const dialogRef = this.dialog.open(ViewobjectDialogComponent, {
      width: "1000px",
      data: {
        type: "message",
        object: user,
      },
    })
  }

  /* Method in charge of accepting the role change */
  acceptRequest(user) {
    let sendDataAccept = {}
    sendDataAccept["user__username"] = user.requesting_user.username
    sendDataAccept["new_role"] = user.new_role
    sendDataAccept["request_status"] = "approved"
    console.log(sendDataAccept)

    this.viewRequestService.acceptOrRejectRolRequest(sendDataAccept).subscribe(
      p => {
        console.log(p)
        this.acceptResponseData = p !== undefined ? p : []
      },
      e => { console.log(e), this.launchMessage("Ocurrió un error, por favor intenta más tarde") },
      () => {
        this.launchMessage("Se aceptó la solicitud de: " + user.requesting_user.first_name + " " + user.requesting_user.last_name)
        this.getRequestData()
      }
    )
  }

  rejectRequest(user) {
    let sendDataReject = {}
    sendDataReject["user__username"] = user.requesting_user.username
    sendDataReject["request_status"] = "reject"
    console.log(sendDataReject)

    this.viewRequestService.acceptOrRejectRolRequest(sendDataReject).subscribe(
      p => {
        console.log(p)
        this.rejectResponseData = p !== undefined ? p : []
      },
      e => { console.log(e), this.launchMessage("Ocurrió un error, por favor intenta más tarde") },
      () => {
        this.launchMessage("Se rechazó la solicitud de: " + user.requesting_user.first_name + " " + user.requesting_user.last_name)
        this.getRequestData()
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
