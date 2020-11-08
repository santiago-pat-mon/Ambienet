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

}
