import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewobjectDialogComponent } from '../viewobject-dialog/viewobject-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  zoom = 16;

  pruebaInformacion = [
    {
      title: "Prueba 1",
      description: "Esta es la descripcion de la prueba 1 sadadasssss ssssssssssssss assssssssssssss ssssssssssssss dasdddddddddd dddddddddddddd saaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaa dassssss ssssssss sssssss ssssssssss sssssss dsaaaaaa aaaaaaaaaaaa aaaaaaa asdddddd ddddddddd dddddddd",
      image: "mclaren1.jpg",
      user: "Steven Saenz M",
      userImage: "default-user-image.png",
      validation: "3",
      novalidation: "1",
      lat: 4.5131224878387,
      lng: -75.65562403136823
    },
    {
      title: "Prueba 2",
      description: "Esta es la descripcion de la prueba 2",
      image: "mclaren2.jpg",
      user: "Santiago Patiño M",
      userImage: "default-user-image.png",
      validation: "4",
      novalidation: "1",
      lat: 5.5131224878387,
      lng: -75.65562403136823
    },
    {
      title: "Prueba 3",
      description: "Esta es la descripcion de la prueba 3",
      image: "mclaren3.jpg",
      user: "Santiago Suaza Z",
      userImage: "default-user-image.png",
      validation: "5",
      novalidation: "1",
      lat: 6.5131224878387,
      lng: -75.65562403136823
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
