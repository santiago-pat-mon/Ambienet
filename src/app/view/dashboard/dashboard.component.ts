import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("filterSelect") filterSelect;
  ls: SecureLS
  rol: string
  zoom = 16;
  errorMessage = ""
  postData = []
  validateData
  validateToSendData = {}
  addValidator = {}
  countValidate = 0
  userName = "";
  visible: boolean = true;
  noDataFileter: boolean = true;
  catastrophes = [
    {
      value: "Todos",
      name: "Todos",
    },
    {
      value: "Derrumbe",
      name: "Derrumbe – Deslizamiento de tierra.",
    },
    {
      value: "Ola_de_calor",
      name: "Ola de calor",
    },
    {
      value: "Granizo",
      name: "Granizo",
    },
    {
      value: "Sequía",
      name: "Sequía",
    },
    {
      value: "Tormenta",
      name: "Tormenta",
    },
    {
      value: "Erupción_volcánica",
      name: "Erupción volcánica",
    },
    {
      value: "Incendio_forestal",
      name: "Incendios forestales",
    },
    {
      value: "Inundación",
      name: "Inundación",
    },
    {
      value: "Sismo",
      name: "Sismo",
    },
    {
      value: "Cuencas_hídricas",
      name: "Contaminación de cuencas hídricas",
    },
    {
      value: "Daño_por_petróleo",
      name: "Derramamiento de petróleo",
    },
    {
      value: "Tala_de_bosques",
      name: "Tala de bosques",
    },
    {
      value: "Minería_ilegal",
      name: "Minería ilegal",
    },
    {
      value: "Otro",
      name: "Otro",
    },
  ]

  /* Component constructor */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private viewPostService: ViewpostService,
  ) { }

  @HostListener("window:scroll")
  scrollPosition(){
    if(window.scrollY >= 100) {
      this.visible = false;
      this.filterSelect.close();
    } else {
      this.visible = true;
    }
  }

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
        let aux = p.results !== undefined ? p.results : []
        this.postData = aux.filter((item) => item.is_banned == false)
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        if(this.postData.length > 0) {
          this.noDataFileter = false;
        } else {
          this.noDataFileter = true;
        }
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
        //console.log(e)
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
          }
        )
      }
    )
  }

  reportPost(objectPost) {
    console.log("REPORTADO")
    console.log(objectPost.id)
    this.viewPostService.sendReportData(objectPost.id).subscribe(
      p => {
        console.log(p)
        this.validateData = p !== undefined ? p : []
      },
      e => {
        console.log(e)
        if (e.error.non_field_errors) {
          this.launchMessage("Usted ya reportó este Post")
        } else {
          this.launchMessage("Ocurrió un error, por favor intenta más tarde")
        }
      },
      () => {
        this.loadData()
        this.launchMessage("Gracias por enviar tu reporte sobre este Post")
      }
    )
  }

  onChangeFilter(value) {
    console.log("HOLA: "+ value);
    
    if(value == "Todos") {
      this.loadData()
    } else {
      this.viewPostService.getPostsFiltered(value).subscribe(
        p => {
          console.log(p.results)
          let aux = p.results !== undefined ? p.results : []
          this.postData = aux.filter((item) => item.is_banned == false)
        },
        e => { console.log(e), this.launchMessage(e) },
        () => {          
          if(this.postData.length > 0) {
            this.noDataFileter = false;
          } else {
            this.noDataFileter = true;
          }
          console.log("Dashboard actualizado")
        }
      )
    }
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
