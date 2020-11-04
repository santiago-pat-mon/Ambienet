import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewobjectDialogComponent } from '../viewobject-dialog/viewobject-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pruebaInformacion = [
    {
      title: "Prueba 1",
      description: "Esta es la descripcion de la prueba 1 sadadasssss ssssssssssssss assssssssssssss ssssssssssssss dasdddddddddd dddddddddddddd saaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaa dassssss ssssssss sssssss ssssssssss sssssss dsaaaaaa aaaaaaaaaaaa aaaaaaa asdddddd ddddddddd dddddddd",
      image: "mclaren1.jpg",
      validation: "3",
      novalidation: "1"
    },
    {
      title: "Prueba 2",
      description: "Esta es la descripcion de la prueba 2",
      image: "mclaren2.jpg",
      validation: "4",
      novalidation: "1"
    },
    {
      title: "Prueba 3",
      description: "Esta es la descripcion de la prueba 3",
      image: "mclaren3.jpg",
      validation: "5",
      novalidation: "1"
    }
  ]

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

}
