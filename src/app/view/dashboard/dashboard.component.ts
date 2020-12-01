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
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  zoom = 16;
  errorMessage = ""
  postData = []
  validateData
  validateToSendData = {}
  addValidator = {}
  countValidate = 0
  userName = ""

  /* Component constructor */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private viewPostService: ViewpostService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.loadData()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
    this.userName = this.ls.get("isLoggedUserName")
  }

  /* Method in charge of loading the posts */
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

  /* Method in charge of making a zoom to the psot image */
  viewObject(object) {
    const dialogRef = this.dialog.open(ViewobjectDialogComponent, {
      width: "1000px",
      data: {
        type: "image",
        object: object,
      },
    })
  }

  /* Method in charge of adding one when a post is validated, it also verifies 
     that a user does not validate a post more than once */
  validatePost(object) {
    this.validateToSendData["user"] = this.userName
    this.validateToSendData["post"] = object.id
    let auxiliar = object.validator_number
    this.addValidator["validator_number"] = auxiliar + 1

    console.log(this.validateToSendData)

    this.viewPostService.sendValidatorData(this.validateToSendData).subscribe(
      p => {
        console.log(p)
        this.validateData = p !== undefined ? p : []
      },
      e => {
        console.log(e)
        console.log(this.validateToSendData)
        console.log(this.addValidator)
        if (e.error.non_field_errors != undefined) {
          this.launchMessage("Usted ya validó este post.")
        }
      },
      () => {
        this.viewPostService.addValidator(this.addValidator, object.id).subscribe(
          p => {
            console.log(p)
            this.validateData = p !== undefined ? p : []
          },
          e => { console.log(e), this.launchMessage(e) },
          () => {
            this.loadData()
            this.launchMessage("Gracias por validar este post: " + object.title)
            this.addValidator = {}
            this.validateToSendData = {}
          }
        )
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
