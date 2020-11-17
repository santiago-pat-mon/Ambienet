import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as SecureLS from 'secure-ls';
import { ViewpostService } from 'src/app/service/viewpost.service';
import { ViewobjectDialogComponent } from '../viewobject-dialog/viewobject-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ls: SecureLS
  rol: string
  zoom = 16;
  errorMessage = ""
  postData = []

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private viewPostService: ViewpostService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.loadData()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  loadData() {
    this.viewPostService.getPosts().subscribe(
      p => {
        console.log(p.results)
        this.postData = p.results !== undefined ? p.results : []
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        console.log("Dashboard actualizado")
      }
    )
  }

  viewObject(object) {
    const dialogRef = this.dialog.open(ViewobjectDialogComponent, {
      width: "1000px",
      data: {
        type: "image",
        object: object,
      },
    })
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
