import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from "src/app/service/company.service";
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  errorMessage = ""
  auxFile = false
  selectedFile = {
    name: null,
    base64textString: null,
    type: null
  }

  /* Component constructor */
  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.startVariables()
  }

  /* HOLA */
  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method responsible for uploading the file to the server */
  loadData() {
    if (this.auxFile != true) {
      this.uploadFile()
      this.launchMessage("Información cargada correctamente.")
    } else {
      this.launchMessage("Por favor cargue un archivo o verifique que el formato del archivo sea .csv, .xlsx, .xls, .xlsm, .xltx, .xltm, .xlam o .xlsb.")
    }
  }

  /* Method in charge of directing users who have not registered and entered as guests */
  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  /* attached file */
  selectFile(event) {
    var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var name1 = file.name.split(".")
      var name = name1[name1.length - 1]
      if (name.toLowerCase() == "csv" || name.toLowerCase() == "xlsx" || name.toLowerCase() == "xls" || name.toLowerCase() == "xlsm" || name.toLowerCase() == "xltx" || name.toLowerCase() == "xltm" || name.toLowerCase() == "xlam" || name.toLowerCase() == "xlsb") {
        this.selectedFile.name = this.uuid() + "." + name.toLowerCase();
        this.selectedFile.type = "attachedFile";
        this.auxFile = false
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      } else {
        this.launchMessage("Por favor verifique que el formato del archivo sea .csv, .xlsx, .xls, .xlsm, .xltx, .xltm, .xlam o .xlsb")
        this.auxFile = true
      }
    }
  }

  /* attached file */
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.selectedFile.base64textString = btoa(binaryString);
  }

  /* attached file */
  uploadFile() {
    this.companyService.uploadFile(this.selectedFile).subscribe(
      (p) => {
      },
      (e) => this.launchMessage(e),
      () => {
      }
    );
  }

  /* Method that generates a unique id to store the files */
  uuid() {
    var uuidValue = "", k, randomValue;
    for (k = 0; k < 12; k++) {
      randomValue = Math.random() * 16 | 0;

      if (k == 8) {
        uuidValue += "-"
      }
      uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
  }

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 10000,
    })
  }
}
