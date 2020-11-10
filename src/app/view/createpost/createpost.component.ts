import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  ls: SecureLS
  rol: string
  myLatitude
  myLongitude
  zoom = 16

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    navigator.geolocation.getCurrentPosition(position => this.getPosition(position))
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  createPost() {

  }

  getPosition(position) {
    this.myLatitude = position.coords.latitude
    this.myLongitude = position.coords.longitude
    console.log("Latitud: ", this.myLatitude)
    console.log("Longitud: ", this.myLongitude)
  }

  /* The event in HTML would be mapClick but because this is a beta version it does not recognize the events, the API has an error
  https://github.com/SebastianM/angular-google-maps/issues/1845#issuecomment-672051511 */
  /* mapClicked($event: google.maps.MouseEvent) {
    this.myLatitude = $event.latLng.lat()
    this.myLongitude = $event.latLng.lng()
  } */

  /* Small solution to the error raised above */
  public mapReadyHandler(map: google.maps.Map): void {
    map.addListener('click', (e: google.maps.MouseEvent) => {
      // Here we can get correct event
      this.myLatitude = e.latLng.lat()
      this.myLongitude = e.latLng.lng()
    });
  }

  selectDeviceLocation() {
    navigator.geolocation.getCurrentPosition(position => this.getPosition(position))
    console.log("hola")
  }

  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

}
