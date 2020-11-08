import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  myLatitude
  myLongitude
  zoom = 16

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => this.getPosition(position))
  }

  createPost() {

  }

  getPosition(position) {
    this.myLatitude = position.coords.latitude
    this.myLongitude = position.coords.longitude
    console.log("Latitud: ", this.myLatitude)
    console.log("Longitud: ", this.myLongitude)
  }

  mapClicked($event: MouseEvent) {
  }

}
